const gulp = require('gulp');
const stylelint = require('gulp-stylelint-esm').default; // Важно: .default

// Задача: линтинг SCSS с отчётом в консоль
function lintStyles() {
    return gulp.src('src/**/*.{scss,css}')
        .pipe(stylelint({
            failAfterError: false, // false — чтобы не прерывать watch при ошибках
            reporters: [
                {
                    formatter: 'string', // или 'verbose' для более подробного вывода
                    console: true
                }
            ]
        }));
}

// Задача: линтинг + автофикс (для npm run stylelint:fix)
function lintStylesFix() {
    return gulp.src('src/**/*.{scss,css}')
        .pipe(stylelint({
            fix: true, // Автоматически исправляет то, что может
            failAfterError: true,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .pipe(gulp.dest('src')); // Записываем исправленные файлы обратно
}

// Экспорт задач
exports.lintStyles = lintStyles;
exports.lintStylesFix = lintStylesFix;

const images = require('./tasks/images');
const pages = require('./tasks/pages');
const clean = require('./tasks/clean').clean;
const cleanImages = require('./tasks/clean').cleanImages;
const purifycss = require('./tasks/purifycss');
const server = require('./tasks/server/server').server;
const watch = require('./tasks/watch');
const styles = require('./tasks/styles');

/**
 * TASKS
 */


gulp.task('build', gulp.series(clean, gulp.parallel(pages, styles, images)));

gulp.task('dev', gulp.series(
    clean,                          // Очистка перед первой сборкой
    gulp.parallel(pages, styles, images), // Первая полная сборка
    gulp.parallel(server, watch)    // Затем сервер + наблюдение
));

// Интеграция в watch (рекомендую запускать линтинг при изменении SCSS)
exports.watch = gulp.series(lintStyles, function watchFiles() {
    gulp.watch('src/**/*.{scss,css}', lintStyles);
    gulp.task('images', gulp.series(cleanImages, images));
});