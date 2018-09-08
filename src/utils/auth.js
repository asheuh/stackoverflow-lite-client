class Authentication {

    UserIsLoggedIn = () => {
        const token = this.getToken()
        if (token == null || 'undefined') {
            return false;
        } else {
            return true;
        }
    }
    setToken = (token) => {
        return localStorage.setItem('access_token', token);
    }

    getToken = () => {
        return localStorage.getItem('access_token');
    }

    removeToken = () => {
        return localStorage.removeItem('access_token');
    }

    logOut = () => {
        logout.addEventListener("click", event => {
            removeToken();
            redirect: window.location.replace("../../templates/mains/signin.html");
        })
    }
}
const auth = new Authentication();
export default auth;
