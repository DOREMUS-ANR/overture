import gulp from 'gulp';
import del from 'del';
import {path, tasks} from './const';

gulp.task(tasks.CLIENT_DEL_DEV, () => del.sync([path.DEV]));

gulp.task(tasks.CLIENT_DEL_DIST, () => del.sync([path.DIST]));
