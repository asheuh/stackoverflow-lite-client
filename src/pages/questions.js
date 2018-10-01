import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";
import helper from "../utils/helpers";

class PostQuestion {
	constructor() {
		this.setState = this.setState.bind(this);
		this.state = {
			isFetching: false
		};
		auth.showPostLoader(this.state);
		this.postQuestion();
		auth.showLoading(this.state);
	}

	setState(newState) {
		return Object.assign(this.state, newState);
	}

	handleMessages(data) {
		if (data.message === "Question posted successfully") {
			let status = document.getElementById("msg");
			status.style.backgroundColor = "#F0FAEE";
			status.style.padding = "8px";
			status.style.color = "#259814";
			status.innerHTML = data.message;
		} else if (data.message !== "Question posted successfully") {
			let err = document.getElementById("msg");
			err.style.display = "block";
			err.style.backgroundColor = "#FCDFDF";
			err.style.padding = "8px";
			err.style.color = "red";
			err.innerHTML = data.message;
		}
		else if (Object.values(data).includes("Token has expired")) {
			auth.removeToken();
			window.location.href = "/auth/login";
		}
	}

	sendData() {
		let question = document.querySelector(".newquestion");
		question.addEventListener("click", event => {
			this.setState({isFetching: true});
			event.preventDefault();
			const data = {
				title: title.value,
				description: description.value
			};

			api.post("/questions/newquestion", data, auth.getToken())
				.then(response => response.json())
				.catch(error => console.error("Error " + error))
				.then(data => {
					this.setState({isFetching: false});
					this.handleMessages(data);
				});
		});
	}

	postQuestion() {
		setTimeout(() => {
			if (!auth.UserIsLoggedIn()) {
				window.location.replace("/auth/login");
			} else if (auth.UserIsLoggedIn()) {
				this.setState({isFetching: true});
				helper.handleProfileLink(this.setState({isFetching: false}));
				this.sendData();
			}
		});
	}
}

const question = new PostQuestion();
export default question;
