import gulp from 'gulp';
import tsc from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import {
  path,
  tasks
} from './const';

const TS_CONFIG = path.ROOT + 'tsconfig.json';

gulp.task(tasks.CLIENT_BUILD_TS_DEV, () => {
  let tsconfigSrc = tsc.createProject(TS_CONFIG);

  return tsconfigSrc.src()
    .pipe(sourcemaps.init())
    .pipe(tsc(tsconfigSrc))
    .js
    .pipe(sourcemaps.write('.',{
      includeContent: false,
      sourceRoot: path.SRC
    }))
    .pipe(gulp.dest(path.DEV));
});

gulp.task(tasks.CLIENT_BUILD_TS_DIST, () => {
  let tsconfigSrc = tsc.createProject(TS_CONFIG);

  return tsconfigSrc.src({
      base: path.DEV
    })
    .pipe(tsc(tsconfigSrc))
    .js
    .pipe(gulp.dest(path.DIST));
});
