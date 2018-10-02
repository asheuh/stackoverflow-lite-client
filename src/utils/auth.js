class Authentication {

    UserIsLoggedIn() {
        const secretkey = this.getToken();
        if (secretkey === null || secretkey === "undefined") {
            return false;
        }
        return true;
    }
    setToken(token) {
        return localStorage.setItem("access_token", token);
    }

    getToken() {
        return localStorage.getItem("access_token");
    }

    removeToken() {
        return localStorage.removeItem("access_token");
    }

    logOut() {
        let element = document.getElementById("logout");
        logout.addEventListener("click", event => {
            this.removeToken();
            window.location.replace("/auth/login");
        });
    }

    showLoading(state) {
        let element = document.getElementById("loading");
        let el = document.getElementById("loader");
        setInterval(() => {
            state.isFetching &&
                (element.innerHTML = el);
        }, 0);
    }

    loader() {
        let markup = "<h1>Searching ...</h1>";
        let container = document.createElement("div");
        let loadNode = document.getElementById("cont");
        container.innerHTML = markup;
        console.log(markup);
        loadNode.appendChild(container);
    }

    showloginLoader(state) {
        let el = document.getElementById("submit");
        setInterval(() => {
            if (state.isFetching) {
                el.innerHTML = "Signing in...";
            } else {
                el.innerHTML = "Signin";
            }
        }, 0);
    }

    showregisterLoader(state) {
        let el = document.getElementById("submit");
        setInterval(() => {
            if (state.isFetching) {
                el.innerHTML = "Creating an account...";
            } else {
                el.innerHTML = "Register";
            }
        }, 0);
    }

    showPostLoader(state) {
        let el = document.querySelector(".newquestion");
        setInterval(() => {
            if (state.isFetching) {
                el.innerHTML = "Posting a question...";
            } else {
                el.innerHTML = "Post";
            }
        }, 0);
    }

}
const auth = new Authentication();
export default auth;
