
const {addListABL} = require("./ABL/addListABL");

const express = require('express');
const {getListsABL} = require("./ABL/getListsABL");

const router = express.Router();

router.post('/add-list', async (req, res) => {
    await addListABL(req, res);
});

router.get('/get-lists', async (req, res) => {
   await getListsABL(req, res);
});

module.exports = router;
