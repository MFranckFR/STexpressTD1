const express = require('express');
const router = express.Router();

const SELECT_ALL_PERSONNE = 'select * from personne';

const username = "Eren Jaeger";

// Tous les utilisateurs
// curl -i localhost:8080/personne/
router.get('/search', (req, resp)=>{
    resp.send(`Recherche personne`);
})
router.get('/', (req, resp) =>{
    // const username = req.params.username ? req.params.username : 'Inconnu';   
    
    // Liste des personnes
    db.query(SELECT_ALL_PERSONNE, (err,rows)=>{
        if (err) throw err;
        resp.render('index.ejs', {username:username, personnes:rows});
    })
})


// curl -i localhost:8080/personne/show?id=1
router.get('/show/:id', (req, resp)=>{
    const id = req.params.id;
    SELECT_ONE_PERSONNE = `select * from personne where id=:id LIMIT 1`;

    // console.log('show', req.url, req.query.id);
    db.query(SELECT_ONE_PERSONNE.replace(/:id/, id), (err,rows)=>{
        if (err) throw err;
        if(rows.length == 1){
            resp.render('pers_show.ejs', {username:username, personne:rows[0]});
        } else {
            resp.send("Il n'y a aucune personne de cette ID");
        }
    })
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
    const INSERT_ONE_PERSONNE = `insert into personne (name, surname, age) values ('${p.name}', '${p.surname}', ${p.age})`;
    // console.log('insert into', INSERT_ONE_PERSONNE);

    db.query(INSERT_ONE_PERSONNE, (err,result)=>{
        // ResultSetHeader {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 6,
        //     info: '',
        //     serverStatus: 2,
        //     warningStatus: 0
        //   }
        if(err) throw err;
        // console.log(result);
        if(result.insertId > 0){
            p.id = result.insertId;
            resp.render('pers_show.ejs', {personne:p});
        }else{
            //resp.redirect('/edit/' + result.insertId);
            resp.send('Erreur', result);
        }
    })

})
// curl -i -H "Content-Type: application/json" -X POST -d "{name:'John', surname:"Doe", age:23}" localhost:8080/personne/add

// =========== UPDATE ==================
// curl -i localhost:8080/personne/edit/1
router.get('/edit/:id', (req, resp)=>{
    const id = req.params.id; //req.query.id,
    action='/personne/edit/' + id,
    success='',
    SELECT_ONE_PERSONNE = `select * from personne where id=:id LIMIT 1`;

    db.query(SELECT_ONE_PERSONNE.replace(/:id/, id), (err,rows)=>{
        if (err) throw err;
        if(rows.length == 1){
            resp.render('pers_edit.ejs', {
                username:username, 
                action:action,
                personne:rows[0],
                success:success});
        } else {
            resp.send("Il n'y a aucune personne de cette ID");
        }
    })
});

//curl -i -H "Content-Type: application/json" -X PUT -d "{id:1, name:'John', 'surname':'Doe', dt_creat:'202102-01 15:00:00'}" localhost:8080/personne/edit
router.post('/edit/:id', (req, resp)=>{
    const id = parseInt(req.params.id);
    const p = {
        id:req.body.id,
        name:req.body.name,
        surname:req.body.surname,
        age:req.body.age};
    console.log(p);
    const UPDATE_ONE_PERSONNE = `UPDATE personne set name='${p.name}', surname='${p.surname}', age=${p.age} where id=${p.id}`;
    console.log('update', UPDATE_ONE_PERSONNE);

    db.query(UPDATE_ONE_PERSONNE, (err,result)=>{
        if (err) throw err;
        console.log('update', result);
        let success = "AUCUNE MAJ";
        let action='/personne/edit/';
        if(result.changedRows == 1){
            // resp.render('pers_edit.ejs', {
            //     action:action,
            //     personne:p});
            success = "MAJ REUSSI";
        } 
        resp.render('pers_edit.ejs', {
            username:username,
            action:action+'/'+p.id,
            personne:p,
            success:success});
    })
})

// ============= DELETE ==================
router.get('/delete/:id', (req, resp)=>{
    const id = parseInt(req.params.id);
    const DELETE_ONE = "delete from personne where id=:id LIMIT 1";
    db.query(DELETE_ONE.replace(/:id/, id), (err,result)=>{
        if (err) throw err;
        let msg = '';
        msg = result.affectedRows > 0 ? `Suppression de personne #${id} réussi` : `Echec de suppression de personne #${id}`;
       
        //console.log('delete id:'+id, result);
        console.log(msg);
        resp.send(msg);
    });
    resp.send('Suppression de personne #' + id);
});

router.delete('/delete/id', (req, resp)=>{
    const id = parseInt(req.params.id);
    resp.send('Suppression personne ' + id);
    resp.send(`<a href="/personne/">Retour vers la liste des personnes</a>`);
})
// curl -i -H "Content-Type: application/json" -X DELETE -d "{nom:'John Doe'}" localhost:8080/personne/delete

module.exports = router;