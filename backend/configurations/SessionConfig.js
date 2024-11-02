require('dotenv').config();
const session = require('express-session');

module.exports = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(process.env.SESSION_EXPIRATION) },
    rolling: true,
};