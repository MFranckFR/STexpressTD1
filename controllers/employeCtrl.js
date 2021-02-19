// const db = require('../models/db_conn');
const Employe = require('../models/employeModel');

exports.getAll = (req, resp) =>{
  const query = Employe.find({}, 
    (err, result)=>{
      if(err) throw err;
      resp.json(result);
    });
}
exports.getOne = (req, resp)=>{
  const id = req.params.id;
  const query = Employe.findById(id, 
    (err, result)=>{
      if(err) throw err;
      console.log('getOne', result);
      resp.json(result);
    });
}

exports.add = (req, resp)=>{
  const emp = req.body;

  if(emp._id === undefined) {
      Employe.create(emp,
        (err, result) => {
          if(err) throw err;
          console.log('add', result);
          resp.json(result);
      });
  } else {
    console.log('emp', emp);
    resp.json(emp);
  }
}

exports.delete = (req, resp) => {
    //const id = req.body._id;
    const id = req.params.id;
    console.log('delete', id);

    Employe.deleteOne({_id: id}, 
      (err, result) => {
        if (err) throw err;
        const _success = result.deletedCount > 0;
        let msg = _success ? 'delete id#' + id : "Not delete";
        console.log(msg, result);
        resp.json({status:200, success:_success, msg:msg});
    });
}


exports.edit = (req, resp) => {
  const emp = req.body;
  const id = emp._id;
  if(id !== undefined) {
    delete emp.dt_crea;
    emp.dt_upt = new Date();
    const opts = { new: true };
    Employe.findOneAndUpdate({_id: id}, emp, opts, (error, result) => {
        if (error) throw error;
        console.error('update', result);
        resp.json(result);
    });
  } else {
    resp.json({status:200, success:false, msg:"No update"});
  }
};
