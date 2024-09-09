const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}

const styles = () => {
    return src('src/css/**/*.css')
        // .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        // .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
}



const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/img'))
}

const images = () => {
    return src([
            'src/img/**/*.jpg',
            'src/img/**/*.png',
            'src/img/**/*.jpeg',
            'src/img/*.svg'
        ])
        .pipe(image())
        .pipe(dest('dist/img'))
}


const scripts = () => {
    return src('src/js/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            toplevel: true,
        }).on('error', notify.onError()))
        // .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
}


watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.resources = resources
exports.default = series(clean, htmlMinify, styles, svgSprites, images, scripts, resources)