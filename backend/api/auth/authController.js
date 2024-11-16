const {registerABL} = require("./ABL/registerABL");
const {loginABL} = require("./ABL/loginABL");
const {checkSessionABL} = require("./ABL/checkSessionABL");
const {getUserDetailsABL} = require("./ABL/getUserDetailsABL");


const express = require('express');

const router = express.Router();

router.post("/register", async (req, res) => {
    await registerABL(req, res);
});

router.post("/login", async (req, res) => {
    await loginABL(req, res);
});

router.get("/check-session", async (req, res) => {
    await checkSessionABL(req, res);
});

router.get("/get-user-details", async (req, res) => {
    await getUserDetailsABL(req, res);
});

module.exports = router;
