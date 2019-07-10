
const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;

// Instantiates a client
const translationClient = new TranslationServiceClient();
console.log(translationClient)
async function translateText() {
    // Construct request
    const request = {
        parent: translationClient.locationPath("ssafy-ss2", "global"),
        contents: ["Hi. JS"],
        mimeType: 'text/html', // mime types: text/plain, text/html
        sourceLanguageCode: 'en-US',
        targetLanguageCode: 'ko-KR',
    };
    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
    }
}

translateText();