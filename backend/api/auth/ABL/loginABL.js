const {StatusCodes} = require("http-status-codes");

async function loginABL(req, res) {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            console.error("Missing login parameters");
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        return res.sendStatus(StatusCodes.OK);

    }catch(err){
        console.error(`Login error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = loginABL;