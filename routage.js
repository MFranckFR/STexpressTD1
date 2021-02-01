const express = require('express');
const app = express();
const personne = require('./routes/personne');

app.use('/personne', personne); 
// acces à cette reoute via localhost:8080/personne

app.get('/', (req, resp) =>{
    resp.send('Salut les gens !');
})

app.listen(8080);
