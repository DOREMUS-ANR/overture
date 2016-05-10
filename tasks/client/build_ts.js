import gulp from 'gulp';
import tsc from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import {
  path,
  tasks
} from './const';
import tsconfigSrc from '../../tsconfig.json';

let filesGlob = tsconfigSrc.filesGlob;

gulp.task(tasks.CLIENT_BUILD_TS_DEV, () => {
  'use strict';

  return gulp.src(filesGlob)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsconfigSrc.compilerOptions))
    .js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: path.SRC
    }))
    .pipe(gulp.dest(path.DEV));
});

gulp.task(tasks.CLIENT_BUILD_TS_DIST, () => {
  'use strict';

  return gulp.src(filesGlob)
    .pipe(tsc(tsconfigSrc.compilerOptions))

  .js
    .pipe(gulp.dest(path.DIST));
});
