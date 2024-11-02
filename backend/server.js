require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const apiController = require('./api/apiController');

const DBService = require('./services/db_service');

const SessionConfig = require('./configurations/SessionConfig');


const app = express();
const port = process.env.PORT || 8080;

(async () => {

    // server launch sequence

    // Database connection
    let db = await  DBService.initConnection();
    if(db === true){
        console.log("Database connection initiated ");
    }else{
        process.exit(1);
        console.log("Database connection failed ");
    }


    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

// session config
    app.use(session(SessionConfig));

    app.use('/api', apiController);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });

    app.use((req, res, next) => {
        return res.status(404).send("<h1>Invalid page</h1>");
    });

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})();


