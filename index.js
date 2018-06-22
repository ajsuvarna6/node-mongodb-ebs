const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

// var methodOverride = require('method-override')

const app = express();
const PORT = process.env.PORT || 3002;

const { createConnection, closeDb } = require('./mongo-connection');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post('/user', (req, res) => {
    console.log(req.body);
    const dbName = 'myproject';
    createConnection((client) => {
        const db = client.db(dbName);
        db.collection('user').insert(req.body).then((docs) => {
            // console.log(docs);
            closeDb(client);
            res.json({
                data: 'Success'
            });
        })
    });
});

app.get('/user', (req, res) => {
    const dbName = 'myproject';
    createConnection((client) => {
        const db = client.db(dbName);
        db.collection('user').find({}).toArray((err, docs) => {
            // console.log(docs);
            closeDb(client);
            res.json({
                data: docs,
                records: docs.length
            });
        })
    });
});

app.get('/user/:id', (req, res) => {
    const dbName = 'myproject';
    createConnection((client) => {
        const db = client.db(dbName);
        db.collection('user').find({
            _id: mongodb.ObjectID(req.params.id)
        }).toArray((err, docs) => {
            // console.log(docs);
            closeDb(client);
            const data = { userId: docs[0]._id, ...docs[0] };
            delete data._id;
            res.status(200).json({
                data: data || null
            });
        })
    });
});

app.delete('/user/:id', (req, res) => {
    const dbName = 'myproject';
    console.log('delete', req.query);
    createConnection((client) => {
        const db = client.db(dbName);
        db.collection('user').deleteOne({
            _id: mongodb.ObjectID(req.params.id)
        }, (err, docs) => {
            // console.log(err, docs);
            closeDb(client);
            res.json({
                data: 'Deleted Successfully!!!'
            });
        });
    });
});


// console.log(process.env);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

