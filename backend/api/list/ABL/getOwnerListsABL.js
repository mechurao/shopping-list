const {StatusCodes} = require("http-status-codes");
const DBService = require("../../../services/db_service");

async function GetOwnerListsABL(req, res) {
    try{
        const id = req.session.user.id;
        let query = await DBService.getOwnerLists(id);

        if(!query){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        console.log(query);
        return res.status(StatusCodes.OK).json(query);


    }catch(err){
        console.error('Error getting list details failed');
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {GetOwnerListsABL};
