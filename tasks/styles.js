'use strict';

/**
 * DEPENDENCIES
 */
const gulp = require('gulp');
const config = require('../config');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const isProd = require('./utils').isProd;

/**
 * STYLES
 * @returns {*}
 */
function styles() {
    return gulp.src(config.styles.input)
        .pipe(sass({
            outputStyle: isProd ? 'compressed' : 'expanded',
            silenceDeprecations: ['import', 'global-builtin'],  // ← подавляем @import и глобальные функции
            quietDeps: true  // ← если предупреждения из node_modules (например, старые библиотеки)
        }).on('error', sass.logError))
        // другие pipe: autoprefixer, etc.
        .pipe(gulp.dest(config.styles.output));
}

module.exports = styles;