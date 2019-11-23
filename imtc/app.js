'use strict'
const { exec } = require('child_process');
const fs = require('fs');

const Main = {
    /**
     * Create temp directory for screenshot
     * Change default location of screenshots
     *
     */
    init(){
        exec("mkdir ~/IMG-text");
        console.log('directory created');

        //change screenshot default location
        exec("defaults write com.apple.screencapture location ~/IMG-text")

        //save new location
        exec("killall SystemUIServer");
    },

    /**
     * copy image recognition text to clipboard
     * @param {string} text - text from image
     */
    pbcopy(text) {
        console.log('pbcopy--- ',text);

        exec(`echo '${text}' | pbcopy`);
    },

    /**
     * Deletes screenshot
     * @param {string} file - path of file to be deleted
     */
    deleteFile(file) {
        require('fs').unlink(file, (err) => {
            if (err) throw err;
            console.log('successfully deleted - ', file);
        });
    }
}

module.exports = Main;
