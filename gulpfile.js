//list dependencies

const { src, dest, watch, series } = require("gulp");

const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// functions

//scss

function compilecss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest("/dist/css"));
}

//js

function jsmin() {
  return src("js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

// images

function optimizeimg() {
  return src("src/images/*.{jpg, png}").pipe(
    imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 2 }),
    ])
    .pipe(dest('dist/images'))
  );
}

// webp images
function webpImages(){
    return src('dst/images/*.{jpg, png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}
// watch tasks

function watchTask(){
    watch('src/scss/*.scss', compilecss);
    watch('src/scss/*.js', jsmin);
    watch('src/scss/*.{jpg, png}', optimizeimg);
    watch('dist/scss/*.{jpg, png}', webpImages);
}
// default gulp
exports.default = series(
    compilecss,
    jsmin,
    optimizeimg,
    webpImages,
    watchTask,
)