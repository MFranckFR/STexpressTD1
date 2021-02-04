const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const session = require('express-session');
// const flash = require('connect-flash');
const mysql2 = require('mysql2');
const app = express();
const personne = require('./routes/personne');
const commentaire = require('./routes/commentaire');


// acces à cette reoute via localhost:8080/personne

//EJS: Embedded Javascript
app.set('engine_view', 'ejs');
app.use(bodyParser.urlencoded({extended : false}));

app.use(`/personne`, personne);
app.use(`/commentaire`, commentaire);
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use(cors())

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

// petit test
// db.query('select * from personne', (err,rows)=>{
//     if (err) throw err;
//     rows.forEach((row, i)=>console.log(`#${i}- id[${row.id}] name:${row.name}, surname:${row.surname}, date:${row.dt_creat}`));
// })

global.db = db;




// app.get('/', (req, resp) =>{
//     let respText = '<p>Connectez vous <a href="/personne/toto">ICI</></p>';
//     resp.send(respText);
// });

app.listen(8080, ()=>console.log('Express en attente'));
