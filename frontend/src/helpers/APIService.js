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

    // List API
    static async addList(list){
        try{
            let response = await fetch(ApiLinks.addListUrl, {
                method: HttpMethod.POST,
                timeout: this.timeout,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({list:list}),
            });
            const status = response.status;
            return (status === StatusCodes.OK);

        }catch (e) {
            console.error("Adding list error", e);
            return false;
        }
    }

    static async getListDetails(id){
        try{
            let response = await fetch(ApiLinks.getListDetailsUrl, {
                method: HttpMethod.POST,
                timeout: this.timeout,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({listID:id}),
            });
            const status = response.status;
            if(status !== StatusCodes.OK){
                return undefined;
            }
            const data = await response.json();
            return data;

        }catch(err){
            console.error("Getting list details error", err);
            return undefined;
        }
    }

    static async getOwnerLists(){

        try{
            let response = await fetch(ApiLinks.getOwnerListsUrl, {
               method: HttpMethod.GET,
               timeout: this.timeout,
            });
            const status = response.status;

            if(status !== StatusCodes.OK){
                return undefined;
            }
            return await response.json();
        }catch (e) {
            alert(e);
            console.error("Getting lists error : ", e);
            return {status:StatusCodes.INTERNAL_SERVER_ERROR}
        }
    }


    static async getParticipatingLists(){
        try{

        }catch(err){
            console.error("Getting list participating lists error : ",err);
            return {status:StatusCodes.INTERNAL_SERVER_ERROR}
        }
    }



}
