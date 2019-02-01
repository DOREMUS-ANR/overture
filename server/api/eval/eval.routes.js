import fs from 'fs-extra';

import { OUT_FOLDER } from '../../../config/constants';


const out = `${OUT_FOLDER}/eval.json`;
function writeOut(content) {
  return fs.ensureFile(out)
  .then(() => fs.readJSON(out, { throws: false }))
  .then((obj) => {
    obj = obj || [];
    obj.push(content);
    return fs.writeJSON(out, obj);
  });
}

function saveEval(req, res) {
  const { states, comment, ip } = req.body;
  const timestamp = Date.now();

   writeOut({
    timestamp,
    ip,
    states,
    comment,
    })
    .then(() => res.json({ status: 'OK' }))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
}

export default class EvalRoutes {
  static init(router) {
    router.post('/eval', saveEval);
  }
}
