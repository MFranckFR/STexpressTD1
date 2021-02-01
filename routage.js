const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const personne = require('./routes/personne');
const commentaire = require('./routes/commentaire');


// acces à cette reoute via localhost:8080/personne

//EJS: Embedded Javascript
app.set('engine_view', 'ejs');
app.use(bodyParser.urlencoded({extended : false}));

app.use(`/personne`, personne);
app.use(`/commentaire`, commentaire);

// app.get('/', (req, resp) =>{
//     let respText = '<p>Connectez vous <a href="/personne/toto">ICI</></p>';
//     resp.send(respText);
// });

app.listen(8080, ()=>console.log('Express en attente'));
