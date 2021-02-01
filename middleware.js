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

// app.get('/', (req, resp, next) =>{
//     let respText = `requete reçue`;
//     console.log(respText);
//     resp.send('Salut les gens !');
//     next();
// },  middleware1, // utilisé en 1er après "requete reçue"
//     middleware2) // utilisé en 2nd

const USERNAME = 'John Doe';

const getDate = ()=>{
   return new Date(Date.now());
}

const dateFrmFR = (date)=>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return  date.toLocaleDateString('fr-FR', options);
}

const myLogger = (req, resp, next) =>{
    const date = getDate();
    console.log(`[${date.toISOString()}] Connexion de ${USERNAME} sur ${req.url}`);
    next();
}
const reqTime = (req, resp, next)=>{
    const date = getDate(), date_fr = dateFrmFR(date);
    req.reqTime = `${date_fr} ${date.getHours()} H:${date.getHours()} min:${date.getSeconds()} sec`;
    next();
}
app.use(myLogger);
app.use(reqTime);

app.get('/', (req, resp, next) =>{
    let respText = `Salut ${USERNAME} ! <a href="/today">Nous sommes le</a>`;
    resp.send(respText);
    next();
}) 

app.get('/today', (req, resp, next) =>{
    let respText = `requete reçue ! Appelé à ${req.reqTime}`;
    resp.send(respText);
    next();
}) // utilisé en 2nd

app.listen(8080, ()=>console.log(`Express en attente`));
