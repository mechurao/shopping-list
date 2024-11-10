const {StatusCodes} = require("http-status-codes");
const DBService = require('../../../services/db_service');
const {hashString, hashMatches} = require("../../../utils/hash");

async function loginABL(req, res) {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            console.error("Missing login parameters");
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        // find user by given mail
        let user = await DBService.getUser(email);
        if(!user){
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }

        // check password
        const userPassword = user.password;
        let check = hashMatches(userPassword, password);
        if(check === false){
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        // save user id to active session
        req.session.user = user;


        return res.sendStatus(StatusCodes.OK);

    }catch(err){
        console.error(`Login error : ${err}`);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {loginABL};