const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const personneModel = require('../models/personneModel');
const username = "Kevin Nivek";

const render_view = (resp, view, data) =>{
    resp.render(view, data);
}

// Tous les utilisateurs
// curl -i localhost:8080/personne/
router.get('/search', (req, resp)=>{
    resp.send(`Recherche personne`);
})
router.get('/', (req, resp) =>{
    // const username = req.params.username ? req.params.username : 'Inconnu';   
    const next = (rows)=>{
        render_view(resp, 'index.ejs', {username:username, personnes:rows});
    }
    const rows = personneModel.getAll(next);
})


// curl -i localhost:8080/personne/show?id=1
router.get('/show/:id', (req, resp)=>{
    const id = req.params.id;

    const next = (rows)=>{
        if(rows.length == 1){
            render_view(resp, 'pers_show.ejs', {username:username, personne:rows[0]});
        } else {
            resp.send("Il n'y a aucune personne de cette ID");
        }
    }
    personneModel.getOne(id,  next);
});

// =========== CREATE ===================


router.get('/add',(req, resp)=>{
    const personne_0 = {id:0, name:'', surname:'', age:0};
    const action = '/personne/add';
    resp.render('pers_edit.ejs', {username:username, 
        action:action,
        personne:personne_0,
        success:'Creation'
        });
});

router.post('/add', (req, resp)=>{
    //resp.send(`Ajout de la personne`);
    // l'objet body vient du module body-parse
    const p = {
        name:req.body.name, 
        surname:req.body.surname,
        age:req.body.age};
    const next = (result) =>{
        // console.log(result);
        if(result.insertId > 0){
            p.id = result.insertId;
            resp.render('pers_show.ejs', {personne:p});
        }else{
            //resp.redirect('/edit/' + result.insertId);
            resp.send('Erreur', result);
        }
    }
    personneModel.addOne(p, next);

})
// curl -i -H "Content-Type: application/json" -X POST -d "{name:'John', surname:"Doe", age:23}" localhost:8080/personne/add

// =========== UPDATE ==================
// curl -i localhost:8080/personne/edit/1
router.get('/edit/:id', (req, resp)=>{
    const id = req.params.id; //req.query.id,
    action='/personne/edit/' + id,
    success='';

    const next = (rows)=>{
        if(rows.length == 1){
            render_view(resp, 'pers_edit.ejs', {
                username:username,
                personne:rows[0],
                action:action,
                success:success});
        } else {
            resp.send("Il n'y a aucune personne de cette ID");
        }
    }
    personneModel.getOne(id,  next);
});

//curl -i -H "Content-Type: application/json" -X PUT -d "{id:1, name:'John', 'surname':'Doe', dt_creat:'202102-01 15:00:00'}" localhost:8080/personne/edit
router.post('/edit/:id', (req, resp)=>{
    const id = parseInt(req.params.id);
    const p = {
        id:req.body.id,
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age};

    const next = (result) =>{
        console.log('update', result);
        let success = "AUCUNE MAJ";
        let action='/personne/edit/';
        if(result.changedRows == 1){
            success = "MAJ REUSSI";
        }
        render_view(resp, 'pers_edit.ejs', {
            username:username,
            action:action+'/'+ p.id,
            personne:p,
            success:success});
    }

    console.log(p);
    personneModel.updateOne(p, next);
})

// ============= DELETE ==================
router.get('/delete/:id', (req, resp)=>{
    const id = parseInt(req.params.id);
    const next = (result) =>{
        let msg = '';
        msg = result.affectedRows > 0 ? `Suppression de personne #${id} réussi` : `Echec de suppression de personne #${id}`;
        msg += `<a href="/personne/">Retour vers la liste des personnes</a>`;
        console.log(msg);
        resp.send(msg);
        //resp.send('Suppression de personne #' + id);
    }
    personneModel.deleteOne(id, next);
});

// router.delete('/delete/id', (req, resp)=>{
//     const id = parseInt(req.params.id);
//     resp.send('Suppression personne ' + id);
//     resp.send(`<a href="/personne/">Retour vers la liste des personnes</a>`);
// })
// curl -i -H "Content-Type: application/json" -X DELETE -d "{nom:'John Doe'}" localhost:8080/personne/delete

module.exports = router;