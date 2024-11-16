const {StatusCodes} = require("http-status-codes");

async function getListsABL(req, res){
    try{
        return res.sendStatus(StatusCodes.OK);

    }catch(err){
        console.error('Get lists ABL', err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {getListsABL};
