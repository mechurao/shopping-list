const {StatusCodes} = require("http-status-codes");


async function getUserDetailsABL(req, res) {
    if(!req.session || !req.session.user){
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    return res.status(StatusCodes.OK).json(req.session.user);
}

module.exports = { getUserDetailsABL };
