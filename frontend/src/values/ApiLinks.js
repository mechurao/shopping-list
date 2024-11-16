const authURL = process.env.REACT_APP_API_URL+"/auth"

const ApiLinks = {
    loginUrl: `${authURL}/login`,
    registerUrl: `${authURL}/register`,
    checkSessionUrl: `${authURL}/check-session`,
    getUserDetailsURL: `${authURL}/get-user-details`,

}
export default ApiLinks
