import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import {
  path,
  tasks
} from './const';

const IMAGES = path.SRC + 'img/**/*';

gulp.task(tasks.CLIENT_IMAGE_DEV, () => {
  'use strict';
  //just copy
  return gulp.src(IMAGES, {
      base: path.SRC
    })
    .pipe(gulp.dest(path.DEV));
});

gulp.task(tasks.CLIENT_IMAGE_DIST, () => {
  'use strict';

  return gulp.src(IMAGES, {
      base: path.SRC
    })
    .pipe(imageMin())
    .pipe(gulp.dest(path.DIST));
});
