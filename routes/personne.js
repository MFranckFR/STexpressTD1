const express = require('express');
const router = express.Router();

router.get('/', (req, resp) =>{
    // const username = req.params.username ? req.params.username : 'Inconnu';   
    const username = "Eren Jägger";
    const personnes = [
        {id:1, name:'John', surname:"Doe", age:22},
        {id:2, name:'John', surname:"Wick", age:42},
        {id:3, name:'John', surname:"Kennedy", age:132},
        {id:4, name:'John', surname:"Jean", age:84}
    ];
    resp.render('index.ejs', {username:username, personnes:personnes});
})

router.get('/:id', (req, resp)=>{
    resp.send(`Module Personne`);
    })
    // curl -i localhost:8080/personne/
    
router.get('/search', (req, resp)=>{
    resp.send(`Recherche personne`);
})

router.post('/add', (req, resp)=>{
    resp.send(`Ajout de la personne`)
})
// curl -i -H "Content-Type: application/json" -X POST -d "{nom:'John Doe'}" localhost:8080/personne/add

router.put('edit', (req, resp)=>{
    req.send(`maj de la personne`);
})
//curl -i -H "Content-Type: application/json" -X PUT -d "{nom:'John Doe'}" localhost:8080/personne/edit

router.delete('/delete', (req, resp)=>{
    resp.send('Suppression personne');
})
// curl -i -H "Content-Type: application/json" -X DELETE -d "{nom:'John Doe'}" localhost:8080/personne/delete


module.exports = router;