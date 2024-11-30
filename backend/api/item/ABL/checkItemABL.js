const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');


async function checkItemABL(req, res) {
    try{
        const {listID, itemID} = req.body;
        if(!listID || !itemID){
            console.log(`Checking list item - missing parameters : listID : ${listID}, itemID : ${itemID}`);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        let data = await DBService.checkItem(listID, itemID);
        if(!data){
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        return res.status(StatusCodes.OK).json({checked: data.checked});

    }catch(e){
        console.error('Checking list item error : ',e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {checkItemABL};
