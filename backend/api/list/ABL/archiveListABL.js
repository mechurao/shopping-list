const DBService = require('../../../services/db_service');
const {StatusCodes} = require("http-status-codes");

async function archiveListABL(req, res) {
    try{
        const {listID} = req.body;
        if(!listID){
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        const query = await DBService.archiveList(listID);
        const status = (query === true) ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR;
        return res.sendStatus(status);
    }catch(err){
        console.error("Archive list error : ",err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {archiveListABL};
