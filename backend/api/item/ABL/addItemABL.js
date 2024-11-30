const {StatusCodes, INTERNAL_SERVER_ERROR} = require("http-status-codes");
const { v4: uuidv4 } = require('uuid');
const DBService = require('../../../services/db_service');




async function addItemABL(req, res) {
    try{
        const {listID, item} = req.body;
        if(!listID || !item){
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        const newItem = {
            id: uuidv4(),
            name: item,
            checked: false
        }
        const query = await DBService.addListItem(listID, newItem);
        const status = (query === true) ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR;
        console.log(status);
        return res.sendStatus(status);

    }catch(e){
        console.error('Adding list item error : ',e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {addItemABL};
