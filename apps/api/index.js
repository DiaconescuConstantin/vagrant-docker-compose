const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Client Setup
var mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit : keys.mysqlPoolConnections,
    host     : keys.mysqlHost,
    user     : keys.mysqlUser,
    password : keys.mysqlPassword,
    database : keys.mysqlDatabase
});

function handleDisconnect(conn) {
    conn.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        pool = mysql.createPool({
            connectionLimit : keys.mysqlPoolConnections,
            host     : keys.mysqlHost,
            user     : keys.mysqlUser,
            password : keys.mysqlPassword,
            database : keys.mysqlDatabase
        });
    });
}
handleDisconnect(pool);

// Express route handlers

app.get('/', (req, res) => {
    console.log('api: /');
    res.send({
        msg: 'This is the api entry point'
    });
});

app.get('/values/all', (req, res) => {
    console.log('api: /values/all');
    pool.query('SELECT * FROM `values`', (error, results, fields) => {
        if (error) {
            res.send({ 
                error: true,
                info: error,
            });
            return;
        }
        res.send(results);
    });  
});

app.all('/values', (req, res) => {
    let name = '';
    let value = '';

    if (req.method === 'GET') {
        name = req.query.name;
        value = req.query.value;
    } else {
        name = req.body.name;
        value = req.body.value;
    }

    console.log(`api: /values?name=${name}&value=${value}`);
    if (name && value) {
        pool.query('INSERT INTO `values`(`name`, `value`) VALUES(?, ?)', [name, value], (error, results, fields) => {
            if (error) {
                res.send({ 
                    error: true,
                    info: error,
                });
                return;
            }
            res.send({ success: true });
        });
        return;
    }
    res.send({ 
        error: true,
        info: 'Missing parameters'
    });
});

app.listen(5000, err => {
    console.log('Listening on port 5000');
}); 