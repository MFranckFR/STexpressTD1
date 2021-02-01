const express = require('express');
const app = express();

app.get('/', (req, resp) =>{
    resp.send('Salut les gens !');
})

app.listen(8080);
