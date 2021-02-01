const express = require('express');
const router = express.Router();

router.get('/', (req, resp) =>{
    // const username = req.params.username ? req.params.username : 'Inconnu';   
    const username = "Eren Jaeger";
    const personnes = [
        {id:1, name:'John', surname:"Doe", age:22},
        {id:2, name:'John', surname:"Wick", age:42},
        {id:3, name:'John', surname:"Kennedy", age:132},
        {id:4, name:'John', surname:"Jean", age:84}
    ];
    resp.render('index.ejs', {username:username, personnes:personnes});
})

// router.get('/:id', (req, resp, next)=>{
//     const id = req.params.id;
//     resp.send(`Module Personne`);
// })
    // curl -i localhost:8080/personne/

router.get('/search', (req, resp)=>{
    resp.send(`Recherche personne`);
})

router.get('/add',(req, resp)=>{
    const personne_0 = {id:0, name:'', surname:'', age:0};
    resp.render('form.ejs', {personne:personne_0});
});
router.post('/add', (req, resp)=>{
    //resp.send(`Ajout de la personne`);
    // l'objet body vient du module body-parse
    const personne = {
        name:req.body.name, 
        surname:req.body.surname,
        age:req.body.age};
    resp.render('presentation.ejs', {personne:personne});
})
// curl -i -H "Content-Type: application/json" -X POST -d "{name:'John', surname:"Doe", age:23}" localhost:8080/personne/add

router.put('edit', (req, resp)=>{
    req.send(`maj de la personne`);
})
//curl -i -H "Content-Type: application/json" -X PUT -d "{nom:'John Doe'}" localhost:8080/personne/edit

router.delete('/delete', (req, resp)=>{
    resp.send('Suppression personne');
})
// curl -i -H "Content-Type: application/json" -X DELETE -d "{nom:'John Doe'}" localhost:8080/personne/delete


module.exports = router;