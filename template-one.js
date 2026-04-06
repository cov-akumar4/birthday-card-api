module.exports = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy Birthday Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh; background: #dce8ec; display: flex; align-items: center; justify-content: center;
            font-family: 'Poppins', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
        }
        .card {
            width: 520px; background: #eaf3f6; border-radius: 20px; padding: 36px 40px 28px 40px;
            position: relative; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }
        .blob-top-right {
            position: absolute; top: 0; right: 0; width: 105px; height: 95px;
            background: linear-gradient(135deg, #87CEEB, #2ab5b0); border-radius: 0 20px 0 55px;
        }
        .blob-bottom-left {
            position: absolute; bottom: 0; left: 0; width: 100px; height: 90px;
            background: linear-gradient(135deg, #87CEEB, #2ab5b0); border-radius: 0 60px 0 20px;
        }
        .dots { position: absolute; display: grid; gap: 7px; }
        .dots span { width: 4px; height: 4px; border-radius: 50%; background: #b0cdd6; display: block; }
        .dots-left { top: 120px; left: 28px; grid-template-columns: repeat(5, 1fr); }
        .dots-right { bottom: 110px; right: 28px; grid-template-columns: repeat(5, 1fr); }
        .asterisk { position: absolute; color: #3ecfbe; font-size: 22px; font-weight: 300; line-height: 1; user-select: none; }
        .ast-left-top { top: 205px; left: 38px; font-size: 26px; }
        .ast-right-mid { top: 185px; right: 50px; font-size: 20px; }
        .ast-right-low { top: 255px; right: 42px; font-size: 20px; }
        .ast-text-left { top: 318px; left: 34px; font-size: 26px; }
        .header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; position: relative; z-index: 2; }
        .profile-area { display: flex; justify-content: center; margin-top: 10px; position: relative; z-index: 2; }
        .profile-wrapper { position: relative; display: inline-block; }
        .profile-img {
            width: 180px; height: 210px; background: #c5d8de; border-radius: 90px 90px 12px 12px;
            display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .profile-img img { width: 100%; height: 100%; object-fit: cover; }
        .birthday-title { font-family: 'Dancing Script', cursive; font-size: 36px; color: #1a3a40; text-align: center; margin-top: 22px; position: relative; z-index: 2; line-height: 1.1; }
        .birthday-subtitle { font-size: 13px; color: #5a7e88; text-align: center; line-height: 1.7; margin-top: 10px; padding: 0 30px; position: relative; z-index: 2; }
        .name-btn {
            display: block; margin: 18px auto 0; background: linear-gradient(90deg, #2ab5b0, #3ecfbe); color: #fff;
            font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; border: none; border-radius: 50px; padding: 13px 52px;
            cursor: pointer; position: relative; z-index: 2; letter-spacing: 0.3px;
        }
        .blob-date { position: absolute; top: 14px; right: 15px; z-index: 3; text-align: center; color: #fff; line-height: 1.2; }
        .blob-date .b-day { font-size: 23px; font-weight: 700; display: block; }
        .blob-date .b-month { font-size: 10px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; }
        .date-ribbon { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 14px; position: relative; z-index: 2; }
        .date-ribbon::before, .date-ribbon::after { content: ''; flex: 1; max-width: 70px; height: 1px; background: linear-gradient(90deg, transparent, #3ecfbe); }
        .date-ribbon::after { background: linear-gradient(90deg, #3ecfbe, transparent); }
        .date-ribbon .ribbon-text { font-size: 12px; font-weight: 600; color: #2ab5b0; letter-spacing: 1.5px; text-transform: uppercase; }
    </style>
</head>
<body>
    <div class="card">
        <div class="blob-top-right"></div>
        <div class="blob-date">
            <span class="b-day">${data.day}</span>
            <span class="b-month">${data.month}</span>
        </div>
        <div class="blob-bottom-left"></div>
        <div class="dots dots-left">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="dots dots-right">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="asterisk ast-left-top">✳</div>
        <div class="asterisk ast-right-mid">✳</div>
        <div class="asterisk ast-right-low">✳</div>
        <div class="asterisk ast-text-left">✳</div>
        <div class="header">
            <img src="${data.logoPath}" alt="Company Logo" style="max-height: 44px; width: auto; object-fit: contain; margin-left: -5px;" />
        </div>
        <div class="profile-area">
            <div class="profile-wrapper">
                <div class="profile-img">
                    <img src="${data.profileImage}" alt="Profile">
                </div>
            </div>
        </div>
        <div class="birthday-title">Happy Birthday To You</div>
        <p class="birthday-subtitle">
            Wishing you a birthday that brings you<br>
            happiness today and gives you memories to<br>
            cherish !!
        </p>
        <div class="date-ribbon">
            <span class="ribbon-text">🎂 &nbsp;${data.day} ${data.month}</span>
        </div>
        <button class="name-btn">${data.name}</button>
    </div>
</body>
</html>
`;
