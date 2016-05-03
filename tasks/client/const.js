export const path = {
  ROOT: './',
  SRC: './client/src/',
  DEV: './client/dev/',
  DIST: './client/dist/',
  TEST: './tests/',
  SERVER: './server/'
};

export const tasks = {
  CLIENT_BUILD_DEV: 'client.build:dev',
  CLIENT_BUILD_DIST: 'client.build:dist',

  CLIENT_FONT_DEV: 'client.fonts:dev',
  CLIENT_FONT_DIST: 'client.fonts:dist',
  CLIENT_VIEWS_DEV: 'client.views:dev',
  CLIENT_VIEWS_DIST: 'client.views:dist',
  CLIENT_IMAGE_DEV: 'client.imgs:dev',
  CLIENT_IMAGE_DIST: 'client.imgs:dist',
  CLIENT_DEL_DEV: 'client.del:dev',
  CLIENT_DEL_DIST: 'client.del:dist',
  CLIENT_COPY_DEPS_DIST: 'client.copy_deps:dist',

  CLIENT_RELOAD: 'client.reload',

  CLIENT_WATCH: 'client.watch',

  CLIENT_BUILD_TS_DEV: 'client.build_ts:dev',
  CLIENT_BUILD_TS_DIST: 'client.build_ts:dist',

  CLIENT_BUILD_STYL_DEV: 'client.build_styl:dev',
  CLIENT_BUILD_STYL_DIST: 'client.build_styl:dist',

  SERVER_DEV: 'server:dev'
};
