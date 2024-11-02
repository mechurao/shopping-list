import express from "express";
import registerABL from "./ABL/registerABL";
import loginABL from "./ABL/loginABL";
import checkSessionABL from "./ABL/checkSessionABL";

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

export default router;