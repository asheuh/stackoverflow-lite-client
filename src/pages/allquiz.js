import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";
import helper from "../utils/helpers";

class Questions {
	constructor() {
		this.setState = this.setState.bind(this);
		this.state = {
			isFetching: false,
			query: ""
		};
		this.fetchQuestions();
		auth.showLoading(this.state);
	}

	setState(newState) {
		return Object.assign(this.state, newState);
	}

	handleData(data) {
		if (data.message === "There is no questions found") {
			let el = document.getElementById("msg");
			el.innerHTML = `
            <div class="panel pale-green">
                <p>${data.message}, feel free to post your questions</p>
            </div>
            `;
		}
		for (let i in data.data) {
			let parentNode = document.getElementById("msg");
			let quizBody = temps.questionBody(data, i);
			let node = document.createElement("div");
			node.classList.add("quiz");
			node.innerHTML = quizBody;
			parentNode.appendChild(node);
		}
		if (Object.values(data).includes("Token has expired")) {
			auth.removeToken();
			window.location.href = "/auth/login";
		}
	}

	fetchQuestions() {
		setTimeout(() => {
			if (!auth.UserIsLoggedIn()) {
				window.location.href = "/auth/login";
			} else if (auth.UserIsLoggedIn()) {
				this.setState({isFetching: true});
				helper.handleProfileLink(this.setState({isFetching: false}));
				api.get("/questions", auth.getToken())
					.then(response => response.json())
					.then(data => {
						this.handleData(data);
					});
			}
		});
	}
}

const question = new Questions;
export default question;
