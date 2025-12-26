'use strict';

const gulp = require('gulp');
const config = require('../config');
const rename = require('gulp-rename');
const sharpResponsive = require('gulp-responsive-modern');
const noop = require('gulp-noop');  // ← добавь этот плагин

function images() {
    const inputGlob = `${config.images.input}/**/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}`;

    return gulp.src(inputGlob, {
        encoding: false,
        allowEmpty: true,
        since: gulp.lastRun(images)
    })
        // Если файлов нет — пропускаем sharpResponsive и просто идём дальше
        .pipe(process.env.HAS_IMAGES ? sharpResponsive({
            formats: [
                { width: () => null },
                { width: 670,  rename: { suffix: '-320' } },
                { width: 960,  rename: { suffix: '-670' } },
                { width: 1280, rename: { suffix: '-960' } },
                { width: 1920, rename: { suffix: '-1280' } },
                { width: 2560, rename: { suffix: '-1920' } },
                { width: 4096, rename: { suffix: '-2560' } },
            ],
            quality: 80,
            progressive: true,
            withMetadata: false,
            errorOnEnlargement: false,
            skipOnEnlargement: true,
            jpegOptions: { progressive: true },
            pngOptions: { progressive: true, compressionLevel: 9 },
            errorOnUnusedImage: false,
            errorOnUnusedConfig: false
        }) : noop())
        .pipe(rename(function(path) {
            const parts = path.dirname.split(/[/\\]/);
            path.dirname = parts[0] || '.';
        }))
        .pipe(gulp.dest(config.images.output));
}

images.displayName = 'images';
images.description = 'Generate responsive images with multiple sizes and optimization';

module.exports = images;