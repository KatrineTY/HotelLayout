const fs = require('fs');
const gulp = require('gulp');
const through2 = require('through2').obj;

gulp.task('default', () => {
  return gulp.src('src/pages/*.pug')
    .pipe(through2(getJsFileWithRequires));
});

function getPathsToSources(file) {
  return file.contents.toString().match(/include .*/g)
    .map((imp) => imp.replace('.pug', '.js').replace('include ', '').replace('..', ''));
}

function getJsFileWithRequires(file, enc, callback) {
  console.log(`${file.stem}`)
  let paths = ['/main.scss', '/components/libs.js'];
  paths.push(...getPathsToSources(file));
  paths = paths.filter((path) => fs.existsSync(`./src${path}`));
  const fileName = `./src/${file.stem}.js`;
  fs.writeFileSync(fileName, '', callback);
  paths.forEach((req) => fs.appendFileSync(fileName, `require('.${req}');`.concat('\n'), callback));
  callback();
}
