const DBService = require('../../../services/db_service');
const {StatusCodes} = require("http-status-codes");
async function GetParticipatingListsABL(req, res) {
    try{
        const id = req.session.user.id;
        let query = await DBService.getParticipatingLists(id);
        if(!query){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return res.status(StatusCodes.OK).json(query);

    }catch(err){
        console.error('Error participants list details failed');
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {GetParticipatingListsABL}
