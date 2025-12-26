const sourceBase = 'src';
const buildBase = 'public';

module.exports = {
    server : {watch: `${buildBase}`},
    scripts: {
        input : `${sourceBase}/**/*.js`,
        output: `${buildBase}/scripts`
    },
    styles: {
        base  : `${sourceBase}/common/styles/styles.scss`,
        input : `${sourceBase}/**/*.scss`,
        output: `${buildBase}/styles`
    },
    pages: {
        input : `${sourceBase}/pages/**/*.twig`,
        watch : [`${sourceBase}/pages/**/*.twig`, `${sourceBase}/components/**/*.twig`, `${sourceBase}/sections/**/*.twig`],
        output: `${buildBase}/pages`
    },
    fonts: {
        output: `${buildBase}/fonts`
    },
    favicons: {
        input : `${sourceBase}/favicons/*.{ico,png}`,
        output: `${buildBase}/favicons`
    },
    images: {
        input : `${sourceBase}/components/**/*.{jpg,png,jpeg,webp}`,
        output: `${buildBase}/images`
    },
    svg: {
        input : `${sourceBase}/components/**/*.svg`,
        output: `${buildBase}/webicons`
    },
    NODE_ENV    : process.env.NODE_ENV || 'development', // or production
    isProduction: this.NODE_ENV === 'production'
};
