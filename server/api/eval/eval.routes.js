const fs = require('fs-extra')

export default class EvalRoutes {
  static init(router) {
    router.post('/eval', saveEval);
  }
}


function saveEval(req, res){
  let {states, comment} = req.body;
  let {ip} = req;
  let timestamp = Date.now();

   writeOut({
    timestamp,
    ip,
    states,
    comment
    })
    .then(()=> res.json({status:'OK'}))
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    });
}

const out = "/Users/pasquale/git/overture/config/eval.json";
function writeOut(content) {

  return fs.ensureFile(out)
  .then(()=> fs.readJSON(out, {throws:false}))
  .then(obj => {
    obj = obj || [];
    obj.push(content)
    return fs.writeJSON(out, obj)
  });
}
