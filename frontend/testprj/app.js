const express = require("express");
const app = express();
const port = 3000;

const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;

const translationClient = new TranslationServiceClient();

async function translateText() {
    const request = {
        parent: translationClient.locationPath("ssafy-ss2", "global"),
        contents: ["Hi, JS"],
        mimeType: 'text/html', // mime types: text/plain, text/html
        sourceLanguageCode: 'en-US',
        targetLanguageCode: 'ko-KR',
    };
    const [response] = await translationClient.translateText(request);
    text = response.translations[0].translatedText;
    console.log(text);
    // return text;
}

// async function getText() {
//     const text = translateText();
// }

app.get("/", function (req, res) {
    translateText()
        .then(res.send("test " + text));
});

app.listen(3000, function () {
    console.log("얍!");
});

