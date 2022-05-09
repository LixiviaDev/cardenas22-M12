const express = require('express')
const app = express()

require('dotenv').config();
const config = require('./config.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');

app.listen(config.PORT, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}/`);
});

app.get('/', (req, res) => {
    db.serialize(()=>{
        db.all('SELECT * FROM prueba', (err,rows) => {     
            if(err){
                res.send("Error encountered while displaying");
                return console.error(err.message);
            }
            let response = "";

            for(let row of rows){
                console.log(` ID: ${row.id},    Name: ${row.nombre}`);
                response += ` ID: ${row.id},    Name: ${row.nombre}<br>`;
            }

            res.send(response);
        });
    });
})