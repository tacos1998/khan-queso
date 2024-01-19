const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const deploy = require('gulp-gh-pages');

gulp.task('clean', function() {
	return del(['build/']);
});

gulp.task('includes', function() {		
	gulp.src(['includes/**/*'])
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('sass', function() {
	gulp.src('src/sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('build/css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('pug', function() {
	gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
		.pipe(pug())
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		}
	});
});

gulp.task('default', ['includes', 'sass', 'pug'], function() {
});

gulp.task('watch', ['browserSync', 'includes', 'sass', 'pug'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/pug/**/*.*', ['pug']);
	gulp.watch('includes/**/*.*', ['includes']);
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['default'], function () {
	return gulp.src("./build/**/*")
	  .pipe(deploy())
  });