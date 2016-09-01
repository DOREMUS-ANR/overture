import gulp from 'gulp';
import gulpif from 'gulp-if';
import stylus from 'gulp-stylus';
import nib from 'nib';
import rupture from 'rupture';
import sourcemaps from 'gulp-sourcemaps';
import {
  path,
  tasks
} from './const';

function stylProcess({
  dist = false
} = {}) {
  'use strict';

  let dest = (dist ? path.DIST : path.DEV);

  return gulp.src([
      path.SRC + '/**/*.styl',
      `!${path.SRC}/styles/dep/**/*.styl`
    ])
    .pipe(gulpif(!dist, sourcemaps.init()))
    .pipe(stylus({
      use: [nib(), rupture()],
      import: ['nib', 'rupture'],
      compress: dist,
      sourcemap: !dist
    }))
    .pipe(gulpif(!dist, sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: path.SRC
    })))
    .pipe(gulp.dest(dest));
}

gulp.task(tasks.CLIENT_BUILD_STYL_DEV, stylProcess);

gulp.task(tasks.CLIENT_BUILD_STYL_DIST, () => {
  'use strict';
  stylProcess({
    dist: true
  });
});
