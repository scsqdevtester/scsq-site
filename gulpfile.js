'use strict';

// Dependancies
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cache        = require('gulp-cache');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var livereload   = require('gulp-livereload');
var minifycss    = require('gulp-minify-css');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var karma        = require('karma').server;


// Paths configuration
var paths = require('./gulp/paths');

// Define the ordering of js
var scriptOrder = [
    paths.scripts.node_modules.jquery,
    paths.scripts.lib.exampleLib,
    paths.scripts.src.app
];

/**
 * Tasks
 * Note: consider breaking tasks into separate files, each w/ their own dependencies defined for a more modular approach.
 * Ref: http://viget.com/extend/gulp-browserify-starter-faq
 */

// Clean Task
gulp.task('clean', function () {
    return gulp.src([
        paths.scripts.dest.app,
        paths.styles.dest.app,
        paths.images.dest.img,
        paths.images.dest.cssImg,
        paths.maps,
        paths.scripts.dest.testRunner + 'specs.js'
    ], {read: false})
        .pipe(clean());
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src(paths.scripts.src.app)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Scripts Task
gulp.task('scripts', function () {
    return gulp.src(scriptOrder)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.scripts.dest.app))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.scripts.dest.app))
        .pipe(notify({message: 'Scripts task complete.'}));
});

// Styles Task
gulp.task('styles', ['cssImages'], function () {
    return gulp.src(paths.styles.src.app)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('../maps')) // NOTE: this preliminary write is required in order to resolve the .scss sources from the additional .min sourcemap
        .pipe(gulp.dest(paths.styles.dest.app))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.styles.dest.app))
        .pipe(notify({message: 'Styles task complete.'}));
});

// CSS Background Images Task
gulp.task('cssImages', function () {
    return gulp.src(paths.images.src.sassImg)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.images.dest.cssImg))
        .pipe(notify({
            message: 'Images task complete.'
        }));
});

// Images Task
gulp.task('images', function () {
    return gulp.src(paths.images.src.img)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.images.dest.img))
        .pipe(notify({
            message: 'Images task complete.'
        }));
});

// Build spec sources for browser-based tests (SpecRunner.html) task.
gulp.task('jasmineSpecTestSources', function () {
    return gulp.src(paths.scripts.src.test.spec)
        .pipe(concat('specs.js'))
        .pipe(gulp.dest(paths.scripts.dest.testRunner))
        .pipe(notify({message: 'jasmineSpecTestSources task complete.'}));
});

// Test task (Karma test runner)
gulp.task('test', ['jasmineSpecTestSources'], function (done) {
    // TODO: investigate gulp-karma plugin
//    return gulp.src(paths.karma)
//        .pipe(karma.start({
//            configFile: __dirname + '/karma.conf.js',
//            singleRun: true
//        }, done))
//        .on('error', function (err) {
//            // Make sure failed tests cause gulp to exit non-zero
//            throw err;
//        });


    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

// Watch Task
gulp.task('watch', function () {
    gulp.watch(paths.scripts.src.app, ['lint', 'scripts']);
    gulp.watch(paths.scripts.src.test.spec, ['test']);
    gulp.watch(paths.styles.src.app, ['styles']);
});

// Dev Install Task - includes watch task
gulp.task('dev', ['lint', 'styles', 'scripts', 'test', 'images', 'watch']);

// Default Install Task - no watch task
gulp.task('default', ['lint', 'styles', 'scripts', 'test', 'images']);
