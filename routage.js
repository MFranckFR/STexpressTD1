const express = require('express');
const app = express();
const personne = require('./routes/personne');

// acces à cette reoute via localhost:8080/personne

//EJS: Embedded Javascript
app.set('engine_view', 'ejs');

app.get('/', (req, resp) =>{
    let respText = '<p>Connectez vous <a href="/personne/toto">ICI</></p>';
    resp.send(respText);
});

app.use(`/personne`, personne);

app.listen(8080);
