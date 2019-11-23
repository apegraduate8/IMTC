'use strict'
const { app } = require('electron');
const { init } = require('./app.js');
const chokidar = require('chokidar');
const tmpdir = require('path').join(require('os').homedir(), '/IMG-text');
const run = require('./image-recognition.js');

/**
 * Watches the screenshot directory
 * triggers run method when screenshot is added
 */
function setWatch() {
    chokidar.watch(tmpdir)
        .on('add', path => run())
        .on('unlink', path => console.log(`filename deleted ${path}`));
}

app.on('ready', () => {
    // creates directory and sets screen shot location for program
    init();
    setTimeout(setWatch, 0);
});

app.on('window-all-closed', () => {
    // we want to watch this event to prevent electron from automatically quiting the application
});

app.on('quit', () => {
  // delete folder
  require('fs').rmdir(tmpdir, () => console.log('directory delete'));
})
