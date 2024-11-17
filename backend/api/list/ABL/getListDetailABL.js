const DBService = require('../../../services/db_service');

const {StatusCodes} = require("http-status-codes");

async function GetListDetailsABL(req, res){

    try{
        const {listID} = req.body;
        if(!listID){
            console.log("List details - missing parameters");
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
        let data = await  DBService.getList(listID);
        if(!data){
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        return res.status(StatusCodes.OK).json(data);
    }catch(err){
        console.error('Loading list details failed');
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { GetListDetailsABL}
