const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

async function generateQRCode(text, path) {
    try {
        const options = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.3,
            margin: 1,
            // color: {
            //     dark:"#010599FF",
            //     light:"#FFBF60FF"
            // },
            scale: 10,
        };
        const dataUrl = await QRCode.toDataURL(text, options);
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(path, base64Data, 'base64');
    } catch (err) {
        console.error(err);
    }
}

async function addLogo(qrPath, logoPath, outputPath) {
    try {
        const qrImage = await Jimp.read(qrPath);
        const logo = await Jimp.read(logoPath);
        const { width } = qrImage.bitmap;


        // Adjust the size of the logo. For example, set it to 1/3 of the QR code's width.
        const logoSize = Math.round(width / 2);
        logo.resize(logoSize, Jimp.AUTO);
        const x = Math.round((width - logo.bitmap.width) / 2);
        const y = Math.round((width - logo.bitmap.height) / 2);

        qrImage.composite(logo, x, y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1
        });

        await qrImage.writeAsync(outputPath);
    } catch (err) {
        console.error(err);
    }
}

function generateQRCodes(pattern, start, end, directory, logoPath) {
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }

    for (let i = start; i <= end; i++) {
        const text = pattern.replace('{}', i);
        const qrPath = path.join(directory, `QRCode_${i}.png`);
        const outputPath = path.join(directory, `QRCode_${i}.png`);
        generateQRCode(text, qrPath).then(() => {
            addLogo(qrPath, logoPath, outputPath);
        });
    }
}

// Usage
generateQRCodes('Hello {}', 1, 10, './qrcodes', './logo.png');