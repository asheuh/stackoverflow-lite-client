import api from "../utils/api";
import auth from "../utils/auth";

class Register {
	constructor() {
		this.setState = this.setState.bind(this);
		this.handleLogin = this.handleSignup.bind(this);
		this.state = {
			isFetching: false
		};
		auth.showregisterLoader(this.state);
		this.handleSignup();
	}

	setState(newState) {
		return Object.assign(this.state, newState);
	}

	sendData(data) {
		if (data.message === "User created successfully") {
			auth.setToken(data.access_token);
			window.location.replace("/questions");
		} else if (data.message !== "User created successfully") {
			let err = document.getElementById("message");
			for (let key in data.message) {
				err.style.display = "block";
				err.style.backgroundColor = "#FCDFDF";
				err.style.padding = "8px";
				err.style.color = "red";
				err.innerHTML = data.message[key];
			}
		} else {
			window.location.reload();
		}
	}

	handleSignup() {
		let register = document.getElementById("submit");
		register.addEventListener("click", event => {
			event.preventDefault();

			const data = {
				name: fullname.value,
				username: username.value,
				email: email.value,
				password: password.value
			};
			this.setState({isFetching: true});
			api
				.post("/auth/register", data)
				.then(response => response.json())
				.catch(error => console.error("Error " + error))
				.then(data => {
					this.setState({isFetching: false});
					this.sendData(data);
				});
		});
	}
}

const register = new Register();
export default register;
