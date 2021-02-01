const express = require('express');
const router = express.Router();

router.post('/add', (req, resp)=>{
    resp.send(`Ajout de la personne`)
})
// curl -i -H "Content-Type: application/json" -X POST -d "{nom:'John Doe'}" localhost:8080/personne/add


router.get('/', (req, resp)=>{
    resp.send(`Module Personne`);
})
// curl -i localhost:8080/personne/

router.get('/search', (req, resp)=>{
    resp.send(`Recherche personne`);
})

router.put('edit', (req, resp)=>{
    req.send(`maj de la personne`);
})
//curl -i -H "Content-Type: application/json" -X PUT -d "{nom:'John Doe'}" localhost:8080/personne/edit

router.delete('/delete', (req, resp)=>{
    resp.send('Suppression personne');
})
// curl -i -H "Content-Type: application/json" -X DELETE -d "{nom:'John Doe'}" localhost:8080/personne/delete

module.exports = router;