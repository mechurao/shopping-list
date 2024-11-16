const express = require('express');

const authController = require('./auth/authController');
const listController = require('./list/listController');

const router = express.Router();

router.use('/auth', authController);
router.use('/list', listController);

module.exports = router;
