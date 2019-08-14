const express = require("express");
const router = express.Router();

const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;
const translationClient = new TranslationServiceClient();

async function translateText(newText, source, target) {
    const request = {
        parent: translationClient.locationPath("ssafy-ss2", "global"),
        contents: [newText],
        mimeType: "text/html",
        sourceLanguageCode: source,
        targetLanguageCode: target
    };
    const [response] = await translationClient.translateText(request);
    const text = response.translations[0].translatedText;
    return text;
}

router.post("/", function(req, res) {
    translateText(req.body.translate, req.body.source, req.body.target).then(
        data => res.json(data)
    );
});

module.exports = router;
