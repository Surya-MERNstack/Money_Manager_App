const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: "./config.env" });
const port = process.env.PORT;

// use middleware
app.use(cors()); 
app.use(express.json());

// mongodb connection
const con = require('./db/connection.js'); 

// using routes
app.use(require('./routes/route'));

app.get('/' ,(req ,res) =>{
     res.send('<h2 style ="color : red">LINKS</h2><h3 style ="color : #1e90ff">https://moneymanager-acen.onrender.com/api/labels</h3>  <h3 style ="color : #1e90ff">https://moneymanager-acen.onrender.com/api/transaction</h3>  <h3 style ="color : #1e90ff">https://moneymanager-acen.onrender.com/api/categories</h3> </> ')
})

con.then(db => {
    if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on('error', err => {
        console.log(`Failed to start the server: ${err}`);
    });
}).catch(error => {
    console.log(`Connection Failed: ${error}`);
});

