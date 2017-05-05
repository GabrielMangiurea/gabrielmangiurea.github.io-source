'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const xo = require('gulp-xo');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const del = require('del');
const htmlLint = require('gulp-w3cjs');

gulp.task('compile:pug', () => {
	return gulp.src('./src/pug/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('../gabrielmangiurea.github.io'));
});

gulp.task('compile:sass', () => {
	return gulp.src('./src/sass/*.sass')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(rename({
		suffix: '.min',
		extname: '.css'
	}))
	.pipe(gulp.dest('../gabrielmangiurea.github.io/css'));
});

gulp.task('compile', ['compile:pug', 'compile:sass']);

gulp.task('build:js', () => {
	return gulp.src('./src/js/*.js')
	.pipe(xo())
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min',
		extname: '.js'
	}))
	.pipe(gulp.dest('../gabrielmangiurea.github.io/js'));
});

gulp.task('build:clean', () => {
	del.sync(['../gabrielmangiurea.github.io/*', '!../gabrielmangiurea.github.io/.git'], {force: true});
});

gulp.task('build:rest', () => {
	return gulp.src(['./src/**', '!./src/{pug,pug/**}', '!./src/{sass,sass/**}', '!./src/{js,js/**}'])
	.pipe(gulp.dest('../gabrielmangiurea.github.io'));
});

gulp.task('build', ['build:clean', 'compile', 'build:js', 'build:rest']);

gulp.task('lint:html', ['build'], () => {
	return gulp.src('./../gabrielmangiurea.github.io/*.html')
	.pipe(htmlLint());
});

gulp.task('default', ['build', 'lint:html']);
