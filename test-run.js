const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const templateOne = require('./template-one');
const templateTwo = require('./template-two');
const templateThree = require('./template-three');

(async () => {
    try {
        console.log('Launching browser for testing...');
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const logoBlackBase64 = fs.readFileSync(path.resolve(__dirname, 'assests/logo-black.png'), 'base64');
        const logoWhiteBase64 = fs.readFileSync(path.resolve(__dirname, 'assests/logo-white.png'), 'base64');
        const profileBase64 = logoBlackBase64; // Use logo as dummy profile image

        const templates = [
            { name: 'template-1', func: templateOne, logo: `data:image/png;base64,${logoBlackBase64}` },
            { name: 'template-2', func: templateTwo, logo: `data:image/png;base64,${logoWhiteBase64}` },
            { name: 'template-3', func: templateThree, logo: `data:image/png;base64,${logoWhiteBase64}` }
        ];

        for (const template of templates) {
            console.log(`Generating test image for ${template.name}...`);
            const page = await browser.newPage();
            
            // HD Quality
            await page.setViewport({ 
                width: 1200, 
                height: 1200, 
                deviceScaleFactor: 5 
            });

            const dummyData = {
                name: "Dummy Employee",
                day: "23",
                month: "July",
                logoPath: template.logo,
                profileImage: `data:image/png;base64,${profileBase64}`
            };

            const htmlContent = template.func(dummyData);
            await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

            const outputPath = path.resolve(__dirname, `test-${template.name}.png`);
            
            const cardElement = await page.$('.card, .card-2, .card-3');
            if (cardElement) {
                const box = await cardElement.boundingBox();
                if (box) {
                    const margin = Math.max(box.width, box.height) * 0.05;
                    const clip = {
                        x: box.x - margin,
                        y: box.y - margin,
                        width: box.width + (margin * 2),
                        height: box.height + (margin * 2)
                    };
                    await page.screenshot({ path: outputPath, type: 'png', clip });
                } else {
                    await cardElement.screenshot({ path: outputPath, type: 'png' });
                }
            } else {
                await page.screenshot({ path: outputPath, fullPage: true, type: 'png' });
            }
            
            console.log(`Saved: ${outputPath}`);
            await page.close();
        }

        await browser.close();
        console.log('Test run completed successfully.');

    } catch (error) {
        console.error('Error during test run:', error);
    }
})();
