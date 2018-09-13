class Authentication {

    UserIsLoggedIn = () => {
        const secretkey = this.getToken()
        if (secretkey === null || secretkey === 'undefined') {
            return false;
        }
        return true;
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
        let element = document.getElementById("logout");
        logout.addEventListener("click", event => {
            this.removeToken();
            redirect: window.location.replace("/auth/login");
        })
    }
}
const auth = new Authentication();
export default auth;
