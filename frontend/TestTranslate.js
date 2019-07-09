async function quickstart(projectId) {
    // Imports the Google Cloud client library
    const Translate = require('@google-cloud/translate');
    // Instantiates a client
    const translate = new Translate.Translate({projectId: projectId});

    // The text to translate
    const text = 'Hello, world!';

    // The target language
    const target = 'ko';

    // Translates some text into Russian
    const translation = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation[0]}`);
}

quickstart('ssafy-ss2');