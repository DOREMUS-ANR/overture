import gulp from 'gulp';
import {
  tasks
} from './const';

gulp.task(tasks.CLIENT_BUILD_DEV, [
  tasks.CLIENT_DEL_DEV,

  tasks.CLIENT_BUILD_TS_DEV,
  tasks.CLIENT_BUILD_STYL_DEV,
  tasks.CLIENT_VIEWS_DEV,
  tasks.CLIENT_IMAGE_DEV,
  tasks.CLIENT_FONT_DEV
]);

gulp.task(tasks.CLIENT_BUILD_DIST, [
  tasks.CLIENT_DEL_DIST,

  tasks.CLIENT_BUILD_TS_DIST,
  tasks.CLIENT_BUILD_STYL_DIST,
  tasks.CLIENT_VIEWS_DIST,
  tasks.CLIENT_IMAGE_DIST,
  tasks.CLIENT_FONT_DIST
]);
