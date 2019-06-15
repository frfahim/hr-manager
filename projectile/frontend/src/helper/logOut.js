// delete token from local storage means user logout
export const logOut = () => {
    localStorage.removeItem('token')
}
