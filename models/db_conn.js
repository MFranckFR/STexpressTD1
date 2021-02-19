const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host:'127.0.0.1',
    user:'testeur',
    password:'SuperP-hass-Word',
    database:'expressComment'
});

db.connect(function(err) {
    if (err) {
        throw err;
    }
});

module.exports = db;

// petit test
// db.query('select * from personne', (err,rows)=>{
//     if (err) throw err;
//     rows.forEach((row, i)=>console.log(`#${i}- id[${row.id}] name:${row.name}, surname:${row.surname}, date:${row.dt_creat}`));
// })

//global.db = db;