const express = require('express');

const authController = require('./auth/authController');
const listController = require('./list/listController');
const itemController = require('./item/itemController');

const router = express.Router();

router.use('/auth', authController);
router.use('/list', listController);
router.use('/item', itemController);

module.exports = router;
