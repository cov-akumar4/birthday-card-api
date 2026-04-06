const express = require('express');
const multer = require('multer');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

const templateOne = require('./template-one');
const templateTwo = require('./template-two');
const templateThree = require('./template-three');

const app = express();
const port = process.env.PORT || 3000;

// Setup Multer for image uploads (uses memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- PUPPETEER BROWSER REUSE LOGIC ---
let browser;
const getBrowser = async () => {
    if (!browser || !browser.isConnected()) {
        console.log('Launching new browser instance...');
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
    }
    return browser;
};

// Helper to get day and month from a date string (e.g., "2023-07-23")
const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return { day, month };
};

// Map logos to Base64 to ensure they load in any environment
const getLogoDataUri = (logoName) => {
    const logoFilePath = path.join(__dirname, 'assests', logoName);
    if (!fs.existsSync(logoFilePath)) return '';
    const logoBase64 = fs.readFileSync(logoFilePath, 'base64');
    return `data:image/png;base64,${logoBase64}`;
};

// Core function to generate card with specified data
const generateCard = async (data) => {
    // Randomly select one of the 3 templates
    const templates = [
        { func: templateOne, logo: 'logo-black.png' },
        { func: templateTwo, logo: 'logo-white.png' },
        { func: templateThree, logo: 'logo-white.png' }
    ];
    const randomIndex = Math.floor(Math.random() * templates.length);
    const selected = templates[randomIndex];
    
    // Inject the selected logo as a Data URI
    data.logoPath = getLogoDataUri(selected.logo);
    const htmlContent = selected.func(data);

    // Use shared browser instance
    const currentBrowser = await getBrowser();
    const page = await currentBrowser.newPage();
    
    try {
        // Set Retina Resolution (3x instead of 5x for speed)
        await page.setViewport({ 
            width: 1200, 
            height: 1200, 
            deviceScaleFactor: 3 
        });

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const cardElement = await page.$('.card, .card-2, .card-3');
        let screenshotBuffer;
        if (cardElement) {
            const box = await cardElement.boundingBox();
            if (box) {
                // Add 5% margin
                const margin = Math.max(box.width, box.height) * 0.05;
                const clip = {
                    x: box.x - margin,
                    y: box.y - margin,
                    width: box.width + (margin * 2),
                    height: box.height + (margin * 2)
                };
                screenshotBuffer = await page.screenshot({ type: 'png', clip });
            } else {
                screenshotBuffer = await cardElement.screenshot({ type: 'png' });
            }
        } else {
            screenshotBuffer = await page.screenshot({ fullPage: true, type: 'png' });
        }
        return screenshotBuffer;
    } finally {
        // Always close the page, but KEEP the browser open for the next request
        await page.close();
    }
};

// 1. API for real user data
app.post('/generate-birthday-card', upload.single('employeeImage'), async (req, res) => {
    try {
        const { employeeName, birthdayDate } = req.body;
        
        if (!employeeName || !birthdayDate || !req.file) {
            return res.status(400).json({ error: 'Please provide employeeName, birthdayDate, and employeeImage.' });
        }

        const employeePhotoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const { day, month } = parseDate(birthdayDate);

        const cardBuffer = await generateCard({
            name: employeeName,
            day,
            month,
            profileImage: employeePhotoBase64
        });

        res.setHeader('Content-Type', 'image/png');
        res.send(cardBuffer);

    } catch (error) {
        console.error('Error generating card:', error);
        res.status(500).json({ error: 'Failed to generate card' });
    }
});

// 2. API for dummy user data
app.get('/generate-dummy-card', async (req, res) => {
    try {
        const dummyData = {
            name: "Dummy Employee",
            day: "21",
            month: "June",
            profileImage: getLogoDataUri('logo-black.png')
        };

        const cardBuffer = await generateCard(dummyData);

        res.setHeader('Content-Type', 'image/png');
        res.send(cardBuffer);

    } catch (error) {
        console.error('Error generating dummy card:', error);
        res.status(500).json({ error: 'Failed to generate dummy card' });
    }
});

app.get('/', (req, res) => res.send('Birthday Card Generator is running!'));

app.listen(port, async () => {
    console.log(`Birthday card generator listening on port ${port}`);
    // Pre-launch browser to avoid delay on first request
    try {
        await getBrowser();
        console.log('Puppeteer browser pre-launched and ready.');
    } catch (e) {
        console.error('Failed to pre-launch browser:', e);
    }
});
