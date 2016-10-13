import gulp from 'gulp';
import {
  path,
  tasks
} from './const';

const FONTS = path.SRC + 'font/**/*';

function copyFonts({
  dist = false
} = {}) {
  let dest = dist ? path.DIST : path.DEV;

  //just copy
  return gulp.src(FONTS, {
      base: path.SRC
    })
    .pipe(gulp.dest(dest));
}

gulp.task(tasks.CLIENT_FONT_DEV, copyFonts);
gulp.task(tasks.CLIENT_FONT_DIST, () => {
  'use strict';
  return copyFonts({
    dist: true
  });
});
