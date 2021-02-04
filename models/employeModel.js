const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/formation';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;
var EmployeSchema = new Schema({
  name: {type: String, required: true, maxlength: 100},
  surname: {type: String, required: true, maxlength: 100},
  age: { type: Number, min: 18, max:122, index: true },
  address: {
      street:{type: String, match: /[a-z ]/},
      cp:{type:Number, min:1000},
      city:{type:String, match: /[a-z ]/},
    },
  dt_crea: { type: Date, default: Date.now },
  dt_upt: { type: Date, default: Date.now}
});

// attention: c'est la table employes avec un 's' qui sera généré
const Employe  =  mongoose.model('employe', EmployeSchema);
module.exports = Employe; 
// db.employes.insert({name:"John", surname:"Doe", age:19, address:{street:"1 rue de la gare", cp:59000, city:"lille"}});
// db.employes.insert({name:"John", surname:"Wick", age:49, address:{street:"2 rue de la baggare", cp:93000, city:"saint-denis"}});
// db.employes.insert({name:"John", surname:"Attend", age:23, address:{street:"1 rue de la seine", cp:75001, city:"paris"}});
//const emp = {name:"Eric", surname:"Ashley", age:72, address:{street:"3 rue de la", cp:75006, city:"paris"}};
//emp.dt_crea = new Date(2020, 3, 14, 13, 30, 11);
//const employe = new Employe(emp);
//employe.save();
// use formation;db.employes.find()