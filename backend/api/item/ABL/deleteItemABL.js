const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');



async function deleteItemABL(req, res) {
    try{
        const {listID, itemID} = req.body;
        if(!listID || !itemID){
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        const query = await DBService.deleteListItem(listID, itemID);
        const status = (query === true) ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR;
        return res.sendStatus(status);
    }catch(err){
        console.error('Item deletion error : ', err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {deleteItemABL};
