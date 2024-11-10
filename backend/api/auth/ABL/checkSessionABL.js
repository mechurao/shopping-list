const {StatusCodes} = require("http-status-codes");

async function checkSessionABL(req, res) {
    try{
        // check session existence
        if(!req.session) {
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        // check session user data
        if(!req.session.user){
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
        return res.sendStatus(StatusCodes.OK);
    }catch(err){
        console.error(`Check session error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {checkSessionABL};