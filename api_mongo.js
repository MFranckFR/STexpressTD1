const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeCtrl = require('./controllers/employeCtrl');

/// var sql = require('./db/db');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try{
    //http://localhost:8080/employe/
    app.get('/employe/', employeCtrl.getAll);

    //curl -i localhost:8080/employe/601c34b4f0ea4dd1d1d54fe8
    app.get('/employe/:id',employeCtrl.getOne);

    //curl -i -H "Content-Type: application/json" -X PUT -d '{"name":"John", "surname":"Doe", "age":19, "address":{"street":"1 rue de la gare", "cp":"59000", "city":"lille"}}' localhost:8080/employe/
    app.put('/employe/', employeCtrl.add);

     //curl -i -H "Content-Type: application/json" -X POST -d '{"_id":"601c34b4f0ea4dd1d1d54fe8", "name":"John", "surname":"Doe", "age":20, "address":{"street":"1 rue de la gare", "cp":59000, "city":"lille"}}' localhost:8080/employe/
    app.post('/employe/', employeCtrl.edit);

    //curl -i -H "Content-Type: application/json" -X DELETE -d '{"_id":"601c5a790e074e8a6659bdae"}' localhost:8080/employe/
    app.delete('/employe/', employeCtrl.delete);

}catch(err){
    console.error(err);
}

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 80');
})

