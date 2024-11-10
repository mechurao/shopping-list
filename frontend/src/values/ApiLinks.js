const authURL = process.env.REACT_APP_API_URL+"/auth"

const ApiLinks = {
    loginUrl: `${authURL}/login`,
    registerUrl: `${authURL}/register`,
    checkSessionUrl: `${authURL}/check-session`,

}
export default ApiLinks