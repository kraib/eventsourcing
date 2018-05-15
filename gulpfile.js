var gulp = require("gulp");
var rename = require("gulp-rename");
var copy = require("gulp-copy");
var ts = require("gulp-typescript");
gulp.task("copy", function() {
  gulp.src("./public").pipe(gulp.dest("./dist/public/"));
});
gulp.task("ts", function() {
  gulp
    .src(["src/**/*.ts", "!src/.baseDir.ts"])
    .pipe(
      ts({
        module: "commonjs",
        target: "es6",
        sourceMap: false,
        experimentalDecorators: true
      })
    )
    .pipe(gulp.dest("./dist"));
});
gulp.task("watch", function() {
  gulp.watch("src/**/*.ts", ["ts"]);
});

gulp.task("default", ["copy", "ts", "watch"]);
