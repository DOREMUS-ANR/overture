import gulp from 'gulp';
import tsc from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import {
  path,
  tasks
} from './const';

const tsProject = tsc.createProject('tsconfig.json',  { sortOutput: true });

gulp.task(tasks.CLIENT_BUILD_TS_DEV, () => {
  'use strict';

  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
    .js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: path.SRC
    }))
    .pipe(gulp.dest(path.DEV));
});

gulp.task(tasks.CLIENT_BUILD_TS_DIST, () => {
  'use strict';

  return tsProject.src()
    .pipe(tsc(tsProject))
    .js
    .pipe(gulp.dest(path.DIST));
});
