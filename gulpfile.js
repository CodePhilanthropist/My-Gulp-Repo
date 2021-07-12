//list dependencies

const {src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

// functions

//scss

function compilecss(){
    return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('/dist/css'))
}

// watch tasks

// default gulp