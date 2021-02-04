const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology:true},
((err,client)=>{
    if(err) throw err;

    const db = client.db('formation');
    const employes = db.collection('employes');

    // employes.insertMany([  //insertOne ({}, (err,result)=>{})
    //     {name:"John", surname:'Kennedy'},
    //     {name:"John", surname:'Wick'},
    //     {name:"John", surname:'John'},
    //     {name:"John", surname:'Jean'},
    //     {name:"John", surname:'Niet'},
    //     {name:"John", surname:'Attend'},
    //     {name:"John", surname:'Ipeurien'}],
    //     (err, result)=>{
    //         if(err) throw err;
    //             console.log(result.result.n);
    //             console.log(result.ops.length);
    //             console.log(`Insert: ${result.result.n} réussi`);
    //     });

    // employes.updateOne({ name: 'John' }, {
    //     $set: {
    //         surname:'Carpenter'
    //     }
    // }, { multi: false },
    // (error, result) => {
    //     if (error)
    //         throw error;
    //     if (result.result.nModified > 0)
    //         console.log('au moins ' + result.result.nModified + ' documents modifies');
    // });
    

    employes.find().toArray((err,result)=>{
        if(err) throw err;
        console.log(result);
    });
}));