module.exports = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Birthday Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,700;1,600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh; background: #0e2d32; display: flex; align-items: center; justify-content: center;
            font-family: 'Poppins', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
        }
        .card-2 {
            width: 520px; background: #0e2d32; border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); position: relative;
        }
        .c2-left-accent {
            position: absolute; left: 0; top: 0; bottom: 0; width: 6px;
            background: linear-gradient(180deg, #3ecfbe, #2ab5b0, #1a7a78);
        }
        .c2-top-deco {
            position: absolute; top: -60px; right: -60px; width: 220px; height: 220px;
            border-radius: 50%; border: 40px solid rgba(62, 207, 190, 0.08);
        }
        .c2-top-deco2 {
            position: absolute; top: 10px; right: 10px; width: 100px; height: 100px;
            border-radius: 50%; border: 20px solid rgba(62, 207, 190, 0.06);
        }
        .c2-inner { padding: 38px 42px 34px 52px; position: relative; z-index: 2; }
        .c2-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; }
        .c2-logo-row { display: flex; align-items: center; gap: 10px; }
        .c2-date-box { text-align: right; }
        .c2-date-num { font-size: 32px; font-weight: 700; color: #3ecfbe; line-height: 1; }
        .c2-date-month { font-size: 11px; color: #4a8f8c; letter-spacing: 2px; text-transform: uppercase; }
        .c2-profile-row { display: flex; align-items: center; gap: 24px; margin-bottom: 30px; }
        .c2-avatar {
            width: 90px; height: 100px; background: #163a40; border-radius: 50px 50px 10px 10px;
            border: 2px solid #2ab5b0; display: flex; flex-direction: column; align-items: center; justify-content: center;
            flex-shrink: 0; overflow: hidden;
        }
        .c2-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .c2-wish { font-size: 11px; color: #4a8f8c; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .c2-heading { font-family: 'Dancing Script', cursive; font-size: 34px; color: #e0f5f4; line-height: 1.1; margin-bottom: 12px; }
        .c2-msg { font-size: 12.5px; color: #6aacaa; line-height: 1.8; }
        .c2-name-bar {
            background: linear-gradient(90deg, #2ab5b0, #3ecfbe); border-radius: 50px;
            padding: 12px 28px; display: inline-flex; align-items: center; gap: 10px; margin-top: 24px;
        }
        .c2-name-bar span { font-size: 14px; font-weight: 700; color: #0e2d32; letter-spacing: 0.5px; }
        .c2-name-bar .star { font-size: 14px; color: #0e2d32; }
        .c2-footer-row { margin-top: 24px; border-top: 1px solid rgba(62, 207, 190, 0.12); padding-top: 16px; display: flex; align-items: center; justify-content: space-between; }
        .c2-footer-txt { font-size: 11px; color: #2d6e6c; }
    </style>
</head>
<body>
    <div class="card-2">
        <div class="c2-left-accent"></div>
        <div class="c2-top-deco"></div>
        <div class="c2-top-deco2"></div>
        <div class="c2-inner">
            <div class="c2-header">
                <div class="c2-logo-row">
                    <img src="${data.logoPath}" alt="Company Logo" style="max-height: 36px; width: auto; object-fit: contain;" />
                </div>
                <div class="c2-date-box">
                    <div class="c2-date-num">${data.day}</div>
                    <div class="c2-date-month">${data.month}</div>
                </div>
            </div>
            <div class="c2-profile-row">
                <div class="c2-avatar">
                   <img src="${data.profileImage}" alt="Profile">
                </div>
                <div class="c2-text-block">
                    <div class="c2-wish">Wishing you a</div>
                    <div class="c2-heading">Happy Birthday To You</div>
                    <p class="c2-msg">May this day bring you happiness, joy, and wonderful memories to cherish forever !!</p>
                </div>
            </div>
            <div>
                <div class="c2-name-bar">
                    <span class="star">✦</span>
                    <span>${data.name}</span>
                    <span class="star">✦</span>
                </div>
            </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
