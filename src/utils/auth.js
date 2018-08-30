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

}
const auth = new Authentication();
export default auth;
