
const {addListABL} = require("./ABL/addListABL");

const express = require('express');
const {getListsABL} = require("./ABL/getListsABL");
const {GetParticipatingListsABL} = require("./ABL/getParticipatingListsABL");
const {GetOwnerListsABL} = require("./ABL/getOwnerListsABL");
const {GetListDetailsABL} = require("./ABL/getListDetailABL");
const {deleteListABL} = require("./ABL/deleteListABL");
const {archiveListABL} = require("./ABL/archiveListABL");


const router = express.Router();

router.post('/add-list', async (req, res) => {
    await addListABL(req, res);
});

router.get('/get-lists', async (req, res) => {
   await getListsABL(req, res);
});

router.get('/get-owner-lists', async (req, res) => {
    await GetOwnerListsABL(req, res);
});

router.get('/get-participating-lists', async (req, res) => {
    await GetParticipatingListsABL(req, res);
});

router.post('/get-list-details', async (req, res) => {
  await GetListDetailsABL(req, res);
});

router.put('/archive-list', async (req, res) => {
    await archiveListABL(req, res);
});

router.delete('/delete-list', async (req, res) => {
    await deleteListABL(req, res);
});

module.exports = router;
