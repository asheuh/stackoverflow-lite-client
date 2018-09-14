import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

(function(window) {
    class Questions {
        constructor() {
            this.setState = this.setState.bind(this);
            this.state = {
                isFetching: false
            };
            this.fetchQuestions();
            auth.showLoading(this.state);
        }

        setState = (newState) => {
            return Object.assign(this.state, newState);
        }

        fetchQuestions = () => {
            setTimeout(() => {
                if (!auth.UserIsLoggedIn()) {
                    window.location.href = "/auth/login";
                } else if (auth.UserIsLoggedIn()) {
                    this.setState({isFetching: true});
                    api.get('/users/userprofile', auth.getToken())
                        .then(res => res.json())
                        .then(data => {
                            this.setState({isFetching: false});
                            document.getElementById("page").style.display = "block";
                            document.getElementById("loader").style.display = "none";
                            temps.profilePageLink(data);
                        });
                    api.get("/questions", auth.getToken())
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "There is no questions found") {
                                let el = document.getElementById('msg');
                                el.innerHTML = `
                                <div class="panel pale-green">
                                    <p>${data.message}, feel free to post your questions here by clicking the post question button</p>
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
                        });
                    auth.logOut();
                }
            });
        }
    }
    window.Questions = Questions;
}(window));

const question = new Questions;
export default question;
