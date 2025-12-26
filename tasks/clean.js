'use strict';

/**
 * DEPENDENCIES
 */
const config = require('./config'); // Путь адаптируй, если config в корне — '../config'
const { deleteAsync } = require('del'); // ← Правильный импорт

/**
 * CLEAN
 */
async function clean() {
    return await deleteAsync([
        config.pages.output,
        config.styles.output
        // Добавь другие папки при необходимости, например config.js.output и т.д.
    ]);
}

async function cleanImages() {
    return await deleteAsync([config.images.output]);
}

clean.displayName = 'clean';
clean.description = 'Clean build folders (pages, styles)';

cleanImages.displayName = 'cleanImages';
cleanImages.description = 'Clean images folder';

module.exports = {
    clean,
    cleanImages
};