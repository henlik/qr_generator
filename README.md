# QR Code Generator with Logo

This Node.js script generates a sequence of QR codes based on a pattern and overlays a logo image at the center of each QR code.

## Dependencies

This script uses the following npm packages:

- `qrcode`: For generating QR codes.
- `jimp`: For image processing (resizing the logo and overlaying it on the QR code).
- `fs`: For file system operations (writing the generated QR codes to files).
- `path`: For handling file and directory paths.

## How to Use

1. Install the necessary npm packages:

```bash
npm install

```

2. Call the `generateQRCodes` function with the following parameters:

- `pattern`: A string with a placeholder {} where the sequence number will be inserted.
- `start`: The start of the sequence.
- `end`: The end of the sequence.
- `directory`: The directory where the generated QR codes will be saved.
- `logoPath`: The path to the logo image file (replace the logo file with your logo).

 ### example:

```javascript

generateQRCodes("HLM-RDC-{}", 1, 10, "qrcodes", "logo.png");

```
This will generate QR codes for the strings 'HLM-RDC-1', 'HLM-RDC-2', ..., 'HLM-RDC-10' and save them in the 'qrcodes' directory. Each QR code will have the logo overlayed at the center.

### Customization

You can customize the size of the QR codes and the logo by adjusting the scale option in the generateQRCode function and the logoSize variable in the addLogo function, respectively.

