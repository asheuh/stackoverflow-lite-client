import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

(function(window) {
    class PostQuestion {
        constructor() {
            this.setState = this.setState.bind(this);
            this.state = {
                isFetching: false
            };
            this.postQuestion();
            auth.showLoading(this.state);
            auth.showPostLoader(this.state);
        }

        setState = (newState) => {
            return Object.assign(this.state, newState);
        }

        postQuestion = () => {
            setTimeout(() => {
                if (!auth.UserIsLoggedIn()) {
                    window.location.replace("/auth/login");
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
                    auth.logOut();
                    let question = document.getElementById('question');
                    question.addEventListener("click", event => {
                        this.setState({isFetching: true});
                        event.preventDefault();
                        const data = {
                            title: title.value,
                            description: description.value
                        };

                        api.post("/questions/newquestion", data, auth.getToken())
                            .then(res => res.json())
                            .catch(error => console.error('Error ' + error))
                            .then(data => {
                                this.setState({isFetching: false});
                                if (data.message === "Question posted successfully") {
                                    let status = document.getElementById('msg')
                                    status.style.backgroundColor = "#F0FAEE";
                                    status.style.padding = "8px";
                                    status.style.color = "#259814";
                                    status.innerHTML = data.message;
                                } else if (data.message !== "Question posted successfully") {
                                    let err = document.getElementById('msg');
                                    err.style.display = "block";
                                    err.style.backgroundColor = "#FCDFDF";
                                    err.style.padding = "8px";
                                    err.style.color = "red";
                                    err.innerHTML = data.message;
                                }
                                else if (Object.values(data).includes('Token has expired')) {
                                    auth.removeToken();
                                    window.location.href = "/auth/login";
                                }
                            });
                    });
                }
            });
        }
    }
    window.PostQuestion = PostQuestion;
}(window));

const question = new PostQuestion();
export default question;
