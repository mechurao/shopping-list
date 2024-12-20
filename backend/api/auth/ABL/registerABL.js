const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');
const {hashString} = require("../../../utils/hash");

async function registerABL(req, res){
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password || !password || !password.length){
            console.error("Missing login parameters");
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        const hashed = hashString(password);
        let data = req.body;
        data.password = hashed;

        let query = await DBService.addUser(data);

        if(query === true){
            req.session.user = {
                id: query._id,
                username:username,
                email:email,
            };
            return res.sendStatus(StatusCodes.OK);
        }else{
            req.session.destroy();
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

        }
    }catch(err){
        console.error(`Register error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {registerABL};
