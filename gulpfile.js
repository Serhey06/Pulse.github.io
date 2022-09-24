const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const path = require("path");
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const currentDir = path.resolve(__dirname);
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: currentDir,
    },
  });
});

gulp.task("styles", function () {
  return gulp
    .src(`${currentDir}/sass/**/*.scss`)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({
        prefix: "",
        suffix: ".min",
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(`${currentDir}/css`))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch((`${currentDir}/sass/**/*.scss`), gulp.parallel("styles"));
/*   gulp.watch(`${currentDir}/sass/base/_mixins.scss`, gulp.parallel("styles"));
  gulp.watch(`${currentDir}/sass/base/_variables.scss`, gulp.parallel("styles"));
  gulp.watch(`${currentDir}/sass/blocks/_promo.scss`, gulp.parallel("styles"));
  gulp.watch(`${currentDir}/sass/blocks/_header.scss`, gulp.parallel("styles"));
  gulp.watch(`${currentDir}/sass/blocks/_header.scss`, gulp.parallel("styles")); */
  gulp.watch(`${currentDir}/index.html`).on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));