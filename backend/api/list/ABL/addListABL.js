const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');
const { v4: uuidv4 } = require('uuid');

async function addListABL(req, res) {
    try{
        const {list} = req.body;
        console.log(list);
        if(!list){
            return res.status(StatusCodes.BAD_REQUEST);
        }
        const userID = req.session.user.id;

        const data = {
            name: list.name,
            archived: false,
            ownerID: userID,
            participants:[],
            items: list.items.map((str) => ({
                id: uuidv4(),
                name: str,
                checked: false,
            }))
        }

        const query = await DBService.addList(data);
        const status = (query === true) ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR;
        return res.sendStatus(status);
    }catch(err){
        console.error(`Adding list error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {addListABL}
