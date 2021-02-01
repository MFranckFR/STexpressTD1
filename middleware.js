const express = require('express');
const app = express();
const middleware1 = (req, resp, next) =>{
    console.log(`middleware1: ${req.url}`);
    next();
}

const middleware2 = (req, resp, next) =>{
    console.log(`middleware2: ${req.url}`);
    //next();
}

//app.use(middleware1);

app.get('/', (req, resp, next) =>{
    console.log(`requete reçue`);
    resp.send('Salut les gens !');
    next();
},  middleware1, // utilisé en 1er après "requete reçue"
    middleware2) // utilisé en 2nd


app.listen(8080, ()=>console.log(`Express en attente`));
