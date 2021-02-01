const express = require('express');
const app = express();
const middleware = (req, resp, next) =>{
    console.log(`middleware: ${req.url}`);
    next();
}

app.use(middleware);

app.get('/', (req, resp) =>{
    console.log(`requete reçue`);
    resp.send('Salut les gens !');
})


app.listen(8080, ()=>console.log(`Express en attente`));
