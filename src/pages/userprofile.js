import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

class Profile {
	constructor() {
		this.userProfile();
		this.mostAnsweredQuestion();
		this.myQuestions();
		this.setState = this.setState.bind(this);
		this.state = {
			isFetching: false
		};
		auth.showLoading(this.state);
	}

	setState(newState) {
		return Object.assign(this.state, newState);
	}

	userProfile() {
		setTimeout(() => {
			if (!auth.UserIsLoggedIn()) {
				window.location.href = "/auth/login";
			} else if (auth.UserIsLoggedIn()) {
				this.setState({isFetching: true});
				api.get("/users/userprofile", auth.getToken())
					.then(response => response.json())
					.then(data => {
						this.setState({isFetching: false});
						document.getElementById("page").style.display = "block";
						document.getElementById("loader").style.display = "none";
						if (Object.values(data).includes("Token has expired")) {
							auth.removeToken();
							window.location.reload();
						}
						temps.profilePageLink(data);
						let element = document.getElementById("myprofile");
						element.innerHTML = temps.profileData(data);
					});
				auth.logOut();
			}
		});
	}

	mostAnsweredQuestion() {
		let el = document.getElementById("mostanswer");
		api.get("/questions/mostanswers", auth.getToken())
			.then(response => response.json())
			.then(data => {
				let item = data.data;
				if (item.length === 0) {
					el.innerHTML = `
                        <div class="panel pale-green">
                            <p>There are no questions</p>
                        </div>
                    `;
				}
				else if (data.message === "There are no questions") {
					el.innerHTML = `
                        <div class="panel pale-green">
                            <p>${data.message}, feel free to post your questions</p>
                        </div>
                        `;
				}
				let result = data.data;
				result.forEach(function(item) {
					if (item) {
						let node = document.createElement("div");
						node.classList.add("quiz");
						node.innerHTML = temps.mostansweredBody(item);
						el.appendChild(node);
					}
				});
			});
	}

	myQuestions() {
		if(!auth.UserIsLoggedIn()) {
			window.location.href = "/auth/login";
		}
		else if (auth.UserIsLoggedIn()) {
			api.get("/users/userprofile", auth.getToken())
				.then(response => response.json())
				.then(data => {
					temps.profilePageLink(data);
				});
			auth.logOut();
		}
		api.get("/questions/myquestions", auth.getToken())
			.then(response => response.json())
			.then(data => {
				let parentNode = document.getElementById("myquestion");
				if (data.message === "There are no questions in the db for you") {
					parentNode.innerHTML = `
                        <div class="panel pale-green">
                            <p>${data.message}, feel free to post your questions</p>
                        </div>
                        `;
				}
				let mydata = data.data;
				mydata.forEach(function(item) {
					let node = document.createElement("div");
					node.classList.add("quiz");
					node.innerHTML = temps.myquestionsBody(item);
					parentNode.appendChild(node);
				});
			});
	}
}

const profile = new Profile();
export default profile;
