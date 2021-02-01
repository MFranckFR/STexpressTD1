const express = require('express');
const router = express.Router();

const username = "Eren Jaeger";
var commentaires = [];

router.get('/', (req, resp) =>{
    resp.render('cmt_index.ejs', {username:username, commentaires:commentaires});
})

router.post('/', (req, resp, next) =>{
    const date = new Date();
    const username = req.body.username;
    // Le prochaine ID de commentaire
    const _id = commentaires.length == 0 ? 1 :
                // = derniere ID des commentaires + 1.
                commentaires.reduce((acc, curr)=>curr.id > acc ? curr.id : acc, 0) + 1;

    commentaire = {id:_id, username:username, date:date.toISOString(), text:req.body.comment}

    commentaires.push(commentaire);

    let textContent = `Ajout de ${commentaire.date}\t[${commentaire.username}]\t${commentaire.text}`;
    console.log(textContent);
    textContent += `&nbsp;<a href="${req.originalUrl}">Commentaires</a>`;
    resp.send(textContent);
})
router.get('/delete', (req, resp)=>{
    // parsedQs = querystring.parse(req.url);
    const id = req.query.id;
    let textContent = '';
    // le commentaire existe ?
    let deleted = commentaires.filter(c=>c.id == id);
    if(!isNaN(id) && deleted.length == 1) {
        commentaires = commentaires.filter(c=>c.id != id);
        textContent = `Suppression de ${commentaire.date}\t[${commentaire.username}]\t${commentaire.text}`;
        console.log(textContent);
        textContent += `&nbsp;<a href="${req.baseUrl}">Commentaires</a>`;

    } else {
        textContent = "Erreur lors de la suppression. Cet ID n'existe pas";
    }
    resp.send(textContent);
});

module.exports = router;