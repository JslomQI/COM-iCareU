var gulp = require('gulp');		//gulp的声明

var uglify = require('gulp-uglify');	//js压缩

var concat = require('gulp-concat');	//合并

var sass = require('gulp-ruby-sass');	//sass操作

var connect = require('gulp-connect');
//js压缩并合并任务
gulp.task('minifyJS', function (){
	return gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./dist/js/'))
})

//sass转为css并合并
gulp.task('minifySass', function () {
	sass('./sass/*.scss',{
		style: 'compressed'
	}).pipe(concat('all.css'))
	.pipe(gulp.dest('./css/'))
})

//浏览器重新加载
gulp.task('reload', ['minifyJS', 'minifySass'], function ()  {
	gulp.src('./index.html').pipe(connect.reload());	
})

//自动更新浏览器
//gulp允许添加一个默认的任务default
gulp.task('default', ['minifyJS', 'minifySass'], function () {
	//开启服务器localhost:8080
	connect.server({
		livereload: true
	});
	//添加监听事件
	gulp.watch(['./index.html', './js/*.js', './sass/*.scss'], ['reload']);
	
	
})
