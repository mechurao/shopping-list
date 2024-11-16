import {StatusCodes} from "http-status-codes";
import ApiLinks from "../values/ApiLinks";
import HttpMethod from "../values/HttpMethod";

export default class APIService {

    static timeout = process.env.REACT_APP_API_TIMEOUT;

    static async login(user){
        try {
            let response = await fetch(ApiLinks.loginUrl, {
               method: HttpMethod.POST,
               body: JSON.stringify(user),
                headers: {"Content-Type": "application/json"},
                timeout: this.timeout,
            });
            const status = response.status;
            return {status: status}
        }catch(error){
            console.error("Login error");
            return {status: StatusCodes.INTERNAL_SERVER_ERROR}
        }
    }

    static async register(user){
        try{
            let response = await fetch(ApiLinks.registerUrl, {
                method: HttpMethod.POST,
                body: JSON.stringify(user),
                headers: {"Content-Type": "application/json"},
                timeout: this.timeout,
            });
            const status = response.status;
            return {status: status}

        }catch(error){
            console.error(`Register error : ${error}`);
            return {status: StatusCodes.INTERNAL_SERVER_ERROR}
        }
    }

    static async checkSession(){
        try{
            let response = await fetch(ApiLinks.checkSessionUrl, {
                method: HttpMethod.GET,
                timeout: this.timeout,
            });

            const status = response.status;
            return (status === StatusCodes.OK);
        }catch(err){
            console.error("Login status check failed : ",err);
            return false;
        }
    }

    static async getUserDetails(){
        try{
            let response = await fetch(ApiLinks.getUserDetailsURL, {
               method: HttpMethod.GET,
               timeout: this.timeout,
            });
            const status = response.status;
            const json = await response.json();

            if(status !== StatusCodes.OK){
                return {status: status}
            }
            return {
                status: StatusCodes.OK,
                data: json
            }

        }catch (e) {
            console.error("Getting user details error", e);
            return undefined;
        }
    }

}
