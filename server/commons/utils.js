export function sendStandardError(res, err) {
  'use strict';
  let m = err && err.message;
  m = m || err;

  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}
