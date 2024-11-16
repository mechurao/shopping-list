const authURL = process.env.REACT_APP_API_URL+"/auth";
const listURL = process.env.REACT_APP_API_URL+"/list";

const ApiLinks = {
    loginUrl: `${authURL}/login`,
    registerUrl: `${authURL}/register`,
    checkSessionUrl: `${authURL}/check-session`,
    getUserDetailsURL: `${authURL}/get-user-details`,

    addListUrl: `${listURL}/add-list`,
    getListsUrl: `${listURL}/get-lists`,

}
export default ApiLinks
