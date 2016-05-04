import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import rev from 'gulp-rev-append';
import {
  path,
  tasks
} from './const';

const VIEWS = path.SRC + '**/*.html';

gulp.task(tasks.CLIENT_VIEWS_DEV, () => {
  'use strict';
  // just copy
  return gulp.src(VIEWS, {
      base: path.SRC
    })
    .pipe(gulp.dest(path.DEV));
});

gulp.task(tasks.CLIENT_VIEWS_DIST, () => {
  'use strict';
  return gulp.src(VIEWS, {
      base: path.SRC
    })
    .pipe(rev()).pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.DIST));
});
