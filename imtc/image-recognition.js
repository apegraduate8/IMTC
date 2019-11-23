'use strict'
const vision = require('@google-cloud/vision');
const FileHound = require('filehound');
const { pbcopy, deleteFile } = require('./app.js');
const tmpdir = require('path').join(require('os').homedir(), '/IMG-text');
const projectId = '754881453550';
const keyFilename = './Image-text-copy.json';

// Creates google vision client
const client = new vision.ImageAnnotatorClient({projectId, keyFilename});

async function run() {
    // searches for the latest screenshot taken
    const files = await FileHound.create()
        .paths(`${tmpdir}`)
        .ext('png')
        .find();

    try {
        //Performs text detection on the screenshot
        const [result] = await client.textDetection(files[0]);
        const detections = result.textAnnotations;

        if (detections) {
            pbcopy(detections[0].description);
            deleteFile(files[0]);
        }
    } catch(e) {
        console.log('DETECT TEXT ERROR - ', e);
    }
}

module.exports = run;
