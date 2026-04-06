module.exports = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Birthday Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh; background: #eaf3f6; display: flex; align-items: center; justify-content: center;
            font-family: 'Poppins', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
        }
        .card-3 {
            width: 520px; background: #eaf3f6; border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 60px rgba(42, 181, 176, 0.15); display: flex; position: relative;
        }
        .c3-left {
            width: 200px; background: linear-gradient(160deg, #1a3a40 0%, #0e2d32 100%);
            display: flex; flex-direction: column; align-items: center; padding: 32px 20px;
            position: relative; flex-shrink: 0; overflow: hidden;
        }
        .c3-left-blob {
            position: absolute; bottom: -40px; left: -40px; width: 130px; height: 130px;
            border-radius: 50%; background: rgba(62, 207, 190, 0.15);
        }
        .c3-avatar {
            width: 100px; height: 115px; background: #1f4a52; border-radius: 50px 50px 12px 12px;
            border: 3px solid #2ab5b0; display: flex; flex-direction: column; align-items: center;
            justify-content: center; overflow: hidden; margin-bottom: 18px; position: relative; z-index: 2;
        }
        .c3-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .c3-date-block {
            background: rgba(62, 207, 190, 0.12); border: 1px solid rgba(62, 207, 190, 0.25);
            border-radius: 14px; padding: 12px 20px; text-align: center; position: relative; z-index: 2;
        }
        .c3-date-block .num { font-size: 30px; font-weight: 700; color: #3ecfbe; line-height: 1; }
        .c3-date-block .mon { font-size: 10px; color: #4a8f8c; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
        .c3-right { flex: 1; padding: 32px 30px; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
        .c3-wish-label { font-size: 10px; color: #3ecfbe; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; margin-bottom: 10px; }
        .c3-heading { font-family: 'Dancing Script', cursive; font-size: 32px; color: #1a3a40; line-height: 1.15; margin-bottom: 14px; }
        .c3-msg { font-size: 12.5px; color: #5a7e88; line-height: 1.8; }
        .c3-name-pill { display: inline-block; background: linear-gradient(90deg, #2ab5b0, #3ecfbe); color: #fff; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 50px; margin-bottom: 16px; }
        .c3-footer { font-size: 11px; color: #8aacb5; }
    </style>
</head>
<body>
    <div class="card-3">
        <div class="c3-left">
            <div class="c3-left-blob"></div>
            <img src="${data.logoPath}" alt="Company Logo" style="max-height: 40px; width: auto; object-fit: contain; margin-bottom: 20px; position: relative; z-index: 2;" />
            <div class="c3-avatar">
                <img src="${data.profileImage}" alt="Profile">
            </div>
            <div class="c3-date-block">
                <div class="num">${data.day}</div>
                <div class="mon">${data.month}</div>
            </div>
        </div>
        <div class="c3-right">
            <div class="c3-top">
                <div class="c3-wish-label">Celebrating You</div>
                <div class="c3-heading">Happy Birthday To You</div>
                <p class="c3-msg">Wishing you a birthday that brings you happiness today and gives you memories to cherish !!</p>
            </div>
            <div class="c3-bottom">
                <div class="c3-name-pill">${data.name}</div>
            </div>
        </div>
    </div>
</body>
</html>
`;
