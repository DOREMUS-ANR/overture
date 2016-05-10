import gulp from 'gulp';
import browserSync from 'browser-sync';
import {
  path,
  tasks
} from './const';

const TS = path.SRC + '**/*.ts';
const JS = path.SRC + '**/*.js';
const STYL = path.SRC + '**/*.styl';
const HTML = path.SRC + '**/*.html';
const IMG = path.SRC + 'img/**/*';
const FONT = path.SRC + 'font/**/*';

gulp.task(tasks.CLIENT_RELOAD, () => {
  'use strict';
  return browserSync.reload();
});


gulp.task(tasks.CLIENT_WATCH, () => {
  'use strict';

  browserSync({
    proxy: 'http://localhost:3333',
    reloadDelay: 1000
  });

  gulp.watch(STYL, [tasks.CLIENT_BUILD_STYL_DEV, () => {
    return gulp.src(path.DEV + 'styles/**/*.css')
      .pipe(browserSync.stream({
        match: '**/*.css'
      }));
  }]);
  gulp.watch(TS, [tasks.CLIENT_BUILD_TS_DEV]).on('change', browserSync.reload);
  gulp.watch(HTML, [tasks.CLIENT_VIEWS_DEV]).on('change', browserSync.reload);
  gulp.watch(JS, [tasks.CLIENT_JS_DEV]).on('change', browserSync.reload);
  gulp.watch(IMG, [tasks.CLIENT_IMAGE_DEV]).on('change', browserSync.reload);
  gulp.watch(FONT, [tasks.CLIENT_FONT_DEV]).on('change', browserSync.reload);
});
