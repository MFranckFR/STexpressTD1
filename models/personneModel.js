const { get } = require('../routes/personne');
const db = require('./db_conn');
const SELECT_ALL_PERSONNE = 'select * from personne';

// Liste des personnes
exports.getAll = (next) =>{
    db.query(SELECT_ALL_PERSONNE, (err,rows)=>{
        if (err) throw err;
        next(rows);
    })
}

exports.getOne = (id, next) =>{
    SELECT_ONE_PERSONNE = `select * from personne where id=:id LIMIT 1`;
    db.query(SELECT_ONE_PERSONNE.replace(/:id/, id), (err,rows)=>{
        if (err) throw err;
        next(rows);
    })
}

exports.updateOne = (p, next) =>{
    const UPDATE_ONE_PERSONNE = `UPDATE personne set name='${p.name}', surname='${p.surname}', age=${p.age} where id=${p.id}`;
    console.log('update', UPDATE_ONE_PERSONNE);
    db.query(UPDATE_ONE_PERSONNE, (err,result)=>{
        if (err) throw err;
        next(result);
    });
}

exports.deleteOne = (id, next)=>{
    const DELETE_ONE = "delete from personne where id=:id LIMIT 1";
    db.query(DELETE_ONE.replace(/:id/, id), (err,result)=>{
        if (err) throw err;
        next(result);
    });
}

exports.addOne = (p, next) =>{
    const INSERT_ONE_PERSONNE = `insert into personne (name, surname, age) values ('${p.name}', '${p.surname}', ${p.age})`;
    db.query(INSERT_ONE_PERSONNE, (err,result)=>{
        if(err) throw err;
        next(result);
    })
}