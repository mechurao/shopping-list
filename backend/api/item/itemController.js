const express = require('express');
const {checkItemABL} = require("./ABL/checkItemABL");
const {addItemABL} = require("./ABL/addItemABL");
const {deleteItemABL} = require("./ABL/deleteItemABL");
const router = express.Router();

router.put("/add-item", async (req, res) => {
    await addItemABL(req, res);
});

router.put("/check-item", async (req, res) => {
    await checkItemABL(req, res);
});

router.delete("/delete-item", async (req, res) => {
    await deleteItemABL(req, res);
})

module.exports = router;
