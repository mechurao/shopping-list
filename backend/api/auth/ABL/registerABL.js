const {StatusCodes} = require("http-status-codes");

async function registerABL(req, res){
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password || !password || !password.length){
            console.error("Missing login parameters");
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        return res.sendStatus(StatusCodes.OK);

    }catch(err){
        console.error(`Register error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = registerABL;