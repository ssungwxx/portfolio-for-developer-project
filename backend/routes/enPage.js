const express = require("express");
const router = express.Router();

const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;
const translationClient = new TranslationServiceClient();

async function translateText(newText) {
    const request = {
        parent: translationClient.locationPath("ssafy-ss2", "global"),
        contents: [newText],
        mimeType: "text/html", // mime types: text/plain, text/html
        sourceLanguageCode: "en-US",
        targetLanguageCode: "ko-KR"
    };
    const [response] = await translationClient.translateText(request);
    const text = response.translations[0].translatedText;
    return text;
}

router.post("/", function(req, res) {
    translateText(req.body.translate).then(text => res.json(text));
});


module.exports = router;
