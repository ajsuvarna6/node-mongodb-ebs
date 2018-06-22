const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name

const createConnection = (cb) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");
        cb(client);
        // const db = client.db(dbName);

        // db.collection('test').insert({ name: 'aj', job: 'IT' }).then((res) => {
        //     console.log(res);
        // })
        // db.collection('test').find({}).toArray((err, docs) => {
        //     console.log(docs);
        // });
        // db.collection('test').deleteMany({}, (err, docs) => {
        //     console.log(err, docs);
        // })
    });
}

const closeDb = (client) => {
    client.close();
}

module.exports = {
    createConnection,
    closeDb
};