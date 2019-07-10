const express = require("express");
const app = express();
const port = 3000;

const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;

const translationClient = new TranslationServiceClient();

async function translateText() {
    const request = {
        parent: translationClient.locationPath("ssafy-ss2", "global"),
        contents: [document.querySelector("html")],
        mimeType: 'text/html', // mime types: text/plain, text/html
        sourceLanguageCode: 'en-US',
        targetLanguageCode: 'ko-KR',
    };
    const [response] = await translationClient.translateText(request);
    const text = response.translations[0].translatedText;
    // console.log(text);
    return text;
}


app.get("/", function (req, res) {
    res.render("index.html");
    translateText()
        .then(text => res.send("text " + text))
});

app.listen(3000, function () {
    console.log("얍!");
});


app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);