const authURL = process.env.REACT_APP_API_URL+"/auth";
const listURL = process.env.REACT_APP_API_URL+"/list";
const itemURL = process.env.REACT_APP_API_URL+"/item";

const ApiLinks = {

    // auth endpoints
    loginUrl: `${authURL}/login`,
    registerUrl: `${authURL}/register`,
    checkSessionUrl: `${authURL}/check-session`,
    getUserDetailsURL: `${authURL}/get-user-details`,

    // list endpoints
    addListUrl: `${listURL}/add-list`,
    getListsUrl: `${listURL}/get-lists`,
    getOwnerListsUrl: `${listURL}/get-owner-lists`,
    getParticipatingListsUrl: `${listURL}/get-participating-lists`,
    getListDetailsUrl: `${listURL}/get-list-details`,
    deleteListUrl: `${listURL}/delete-list`,

    // item endpoints
    addListItemUrl: `${itemURL}/add-item`,
    checkListItemUrl: `${itemURL}/check-item`,
    deleteItemUrl: `${itemURL}/delete-item`,


}
export default ApiLinks
