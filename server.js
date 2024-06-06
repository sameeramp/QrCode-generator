const express = require('express')
const app = express();
const QRCode = require('qrcode')
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000
app.set("PORT", PORT)
const allowedDomains = ['dottt.me', 'ai.dottt.me', 'dotttme.com'];


app.get('/health', (req, res) => {
    //console.log("health page")

    return res.status(200).send('health page')

})

const isValidUrl = (url) => {
    const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/gi;
    if (!regexURL.test(url)) {
        return false;
    }

    try {
        const { hostname } = new URL(url);
        return allowedDomains.some(domain => hostname.endsWith(domain));
    } catch (err) {
        return false;
    }
};


app.get('/qrcode/download', async (req, res) => {
    const { chs, cht, chl, fileType } = req.query;
    // console.log(chl, "reqqq")


    if (!chs || !cht || !chl || cht !== 'qr') {
        return res.status(400).send('Invalid query parameters');
    }



    const sizeMatch = chs.match(/^(\d+)x(\d+)$/);



    if (!sizeMatch) {
        return res.status(400).send('Invalid size format. Use WIDTHxHEIGHT.');
    }
    const width = parseInt(sizeMatch[1], 10);
    const height = parseInt(sizeMatch[2], 10);

    // if(!fileType || !['png','svg','png'].includes(fileType.toLowerCase())){
    //     return res.status(400).send("invalid  file type use png or svg")
    // }

    // if (!isValidUrl(chl)) {

    //     return res.status(400).send('Bad Request')

    // }
    if (!isValidUrl(chl)) {
        return res.status(400).send('Invalid URL or URL not allowed');
    }
    try {


        const QrcodeDataURL = await QRCode.toDataURL(chl, {
            width: width,
            height: height,
            fileType: fileType
            //type: fileType.toLowerCase()

        });

        const base64Data = QrcodeDataURL.replace(/^data:image\/png;base64,/, '');

        const imgBuffer = Buffer.from(base64Data, 'base64');
        const dealerNameMatch = chl.match(/:\/\/[^\/]+\/([^\/]+)/);
        const dealerName = dealerNameMatch ? dealerNameMatch[1] : 'qr-code';
        res.set({
            'Content-Type': `image/${fileType.toLowerCase()}`,
            'Content_Disposition': `attachment; filename="${dealerName}-qrcode.${fileType.toLowerCase()}"`


        });

        res.send(imgBuffer);

        // console.log(imgBuffer, "QrcodeDataURL")
    }
    catch (error) {
        res.status(500).send('ErrorGenerating QR code')
    }


})


app.listen(app.get("PORT"), () => {
    console.log(`App is running in ${app.get("PORT")}`)
})


