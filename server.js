const express = require('express');
const multer = require('multer');
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');

const templateOne = require('./template-one');
const templateTwo = require('./template-two');
const templateThree = require('./template-three');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // allow frontend calls

// Cache for CMS data (simple in-memory)
let cache = null;
let lastFetch = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

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
        // Set Resolution (3x for HD balance)
        await page.setViewport({ 
            width: 1200, 
            height: 1200, 
            deviceScaleFactor: 3 
        });

        // Load content and wait for it to be ready
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.evaluate(() => document.fonts.ready);

        const cardElement = await page.$('.card, .card-2, .card-3');
        let screenshotBuffer;
        
        if (cardElement) {
            const box = await cardElement.boundingBox();
            if (box && box.width > 0 && box.height > 0) {
                // Add 5% margin
                const margin = Math.max(box.width, box.height) * 0.05;
                const clip = {
                    x: Math.max(0, box.x - margin),
                    y: Math.max(0, box.y - margin),
                    width: box.width + (margin * 2),
                    height: box.height + (margin * 2)
                };
                
                // Ensure clip is within viewport to avoid errors
                screenshotBuffer = await page.screenshot({ 
                    type: 'png', 
                    clip: clip 
                });
            } else {
                screenshotBuffer = await cardElement.screenshot({ type: 'png' });
            }
        } else {
            screenshotBuffer = await page.screenshot({ fullPage: true, type: 'png' });
        }
        return screenshotBuffer;
    } finally {
        await page.close();
    }
};

// Common Send function to handle headers properly
const sendImage = (res, buffer) => {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer);
};

// Webflow CMS API endpoint
app.get('/cms', async (req, res) => {
  try {
    // Serve cache if valid
    if (cache && Date.now() - lastFetch < CACHE_TTL) {
      return res.json(cache);
    }
     
    const COLLECTION_ID = '696901dbe869a47c33ae9899';
    const WEBFLOW_TOKEN = '99ca51c5de50f55fdda784487b191d978b63c11001d81573e0a4825a1a1286d0';

    const response = await axios.get(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`,
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        },
      }
    );

    const items = response.data.items || [];

    // Build optimized search index (same as your frontend logic)
    const index = items.map(item => {
      const f = item.fieldData || {};

      const strip = html =>
        (html || '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase();

      return {
        slug: f.slug,
        searchBlob: [
          f.name,
          f.subtitle,
          f.background,
          f.challenge,
          f.solution,
          strip(f.implementation),
          strip(f.results),
        ]
          .join(' ')
          .toLowerCase(),
      };
    });

    // Save cache
    cache = index;
    lastFetch = Date.now();

    res.json(index);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch CMS data' });
  }
});

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

        sendImage(res, cardBuffer);

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
        sendImage(res, cardBuffer);

    } catch (error) {
        console.error('Error generating dummy card:', error);
        res.status(500).json({ error: 'Failed to generate dummy card' });
    }
});

app.get('/', (req, res) => res.send('Birthday Card Generator is running!'));

app.listen(port, async () => {
    console.log(`Birthday card generator listening on port ${port}`);
    try {
        await getBrowser();
        console.log('Puppeteer browser pre-launched and ready.');
    } catch (e) {
        console.error('Failed to pre-launch browser:', e);
    }
});
