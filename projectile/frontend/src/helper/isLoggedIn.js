// check token is available if available then user is authenticated
export const isLoggedIn = () => {
  return localStorage.getItem("token");
};
