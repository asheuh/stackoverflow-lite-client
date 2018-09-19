class Authentication {

    UserIsLoggedIn() {
        const secretkey = this.getToken()
        if (secretkey === null || secretkey === 'undefined') {
            return false;
        }
        return true;
    }
    setToken(token) {
        return localStorage.setItem('access_token', token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    removeToken() {
        return localStorage.removeItem('access_token');
    }

    logOut() {
        let element = document.getElementById("logout");
        logout.addEventListener("click", event => {
            this.removeToken();
            redirect: window.location.replace("/auth/login");
        })
    }

    showLoading(state) {
        let element = document.getElementById('loading');
        let el = document.getElementById('loader');
        setInterval(() => {
            state.isFetching &&
                (element.innerHTML = el);
        }, 0);
    }

    showloginLoader(state) {
        let el = document.getElementById('submit');
        setInterval(() => {
            if (state.isFetching) {
                el.innerHTML = "Signing in...";
            } else {
                el.innerHTML = "Signin";
            }
        }, 0);
    }

    showregisterLoader(state) {
        let el = document.getElementById('submit');
        setInterval(() => {
            if (state.isFetching) {
                el.innerHTML = "Creating an account...";
            } else {
                el.innerHTML = "Register";
            }
        }, 0);
    }

}
const auth = new Authentication();
export default auth;
