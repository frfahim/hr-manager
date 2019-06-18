import ApiHelper from "../api/ApiHelper";


// clear local storage means user logout
export const logOut = () => {
    localStorage.clear()
    ApiHelper.userLogout().then( request => {
        console.log("Successfully Logout");
    }).catch( error => {
        console.log("Logout error");
    })

}
