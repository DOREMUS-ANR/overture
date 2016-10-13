import gulp from 'gulp';
import {
  path,
  tasks
} from './const';

const JS = path.SRC + '**/*.js';

function copyJs({
  dist = false
} = {}) {
  let dest = dist ? path.DIST : path.DEV;

  //just copy
  return gulp.src(JS, {
      base: path.SRC
    })
    .pipe(gulp.dest(dest));
}

gulp.task(tasks.CLIENT_JS_DEV, copyJs);
gulp.task(tasks.CLIENT_JS_DIST, () => {
  'use strict';
  return copyJs({
    dist: true
  });
});
