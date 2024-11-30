const {StatusCodes} = require("http-status-codes");

async function logoutABL(req, res) {
    try{
        if(!req.session || !req.session.user){
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        req.session.destroy();
        return res.sendStatus(StatusCodes.OK);
    }catch(err){
        console.error('Logout error : ',err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports = {logoutABL};
