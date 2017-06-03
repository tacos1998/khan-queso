const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const nunjucks = require("gulp-nunjucks");
const browserSync = require("browser-sync");

gulp.task("clean", function() {
	return del(["build/"]);
});

gulp.task("includes", function() {		
	gulp.src("includes/**/*.*")
		.pipe(gulp.dest("build/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("sass", function() {
	gulp.src("src/sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("build/css/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("nunjucks", function() {
	gulp.src("src/njk/**/*.html")
		.pipe(nunjucks.compile())
		.pipe(gulp.dest("build/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "build"
		}
	});
});

gulp.task("default", ["includes", "sass", "nunjucks"], function() {
});

gulp.task("watch", ["browserSync", "includes", "sass", "nunjucks"], function() {
	gulp.watch("src/sass/**/*.scss", ["sass"]);
	gulp.watch("src/njk/**/*.*", ["nunjucks"]);
	gulp.watch("includes/**/*.*", ["includes"]);
});