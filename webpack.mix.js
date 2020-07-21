const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss')
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');

mix.jigsaw();

mix.js('source/_assets/js/app.js', 'js');

mix.sass('source/_assets/sass/app.scss', 'css');

mix.options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')],
});

if (mix.inProduction()) {
    mix.version();
}
