const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');

async function deleteListABL(req, res) {
    try{
        const {listID} = req.body;
        if(!listID){
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        const query = await DBService.deleteList(listID);
        const status = (query === true) ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR;
        return res.sendStatus(status);
    }catch(err){
        console.error('List item deletion error : ', err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {deleteListABL};
