import api from "../utils/api";
import auth from "../utils/auth";

class Login {
    constructor() {
        this.setState = this.setState.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            isFetching: false
        };
        auth.showloginLoader(this.state);
        this.handleLogin();
    }

    setState(newState) {
        return Object.assign(this.state, newState);
    }

    handleLogin() {
        let login = document.getElementById('submit');
        if (login) {
            login.addEventListener("click", event => {
                event.preventDefault();
                this.setState({isFetching: true});
                const data = {
                    username: username.value,
                    password: password.value
                };
                api.post("/auth/login", data)
                    .then(res => {
                        return res.json();
                    })
                    .catch(error => console.error('Error ' + error))
                    .then(data => {
                        this.setState({isFetching: false});
                        if (data.message === "Successfully logged in") {
                            let status = document.getElementById('message')
                            auth.setToken(data.access_token);
                            redirect: window.location.replace("/questions");
                        } else {
                            let err = document.getElementById('message')
                            err.style.backgroundColor = "#FCDFDF";
                            err.style.padding = "8px";
                            err.style.color = "red";
                            err.innerHTML = data.message;
                        }
                        return data.message;
                    });
            });
        }
    }
}

const login = new Login();
export default login;
