import auth from "../utils/auth";
import api from "../utils/api";
import temps from "../utils/templates";

(function(window) {
    class Details {
        constructor() {
            this.id = window.location.search.substr(1);
            this.showDetails();
            this.postAnswer();
            this.setState = this.setState.bind(this);
            this.handleUpvote = this.handleUpvote.bind(this);
            this.handleDownvote = this.handleDownvote.bind(this);
            this.state = {
                isFetching: false,
                upvoted: false,
                downvoted: false
            };
            auth.showLoading(this.state);
        }

        handleUpvote = () => {
            this.state.upvoted = !this.state.upvoted;
            this.state.downvoted = this.state.downvoted;
        }

        handleDownvote = () => {
            this.state.downvoted = !this.state.downvoted;
            this.state.upvoted = this.state.upvoted;
        }

        computeUpvoteDownvote = () => {
            if (this.state.upvoted) {
                let elemt = document.getElementById('up');
                api.patch(`/questions/${this.id}/answers/${this.id}/upvote`, auth.getToken())
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    });
            }else if (this.state.downvoted) {
                return 2 - 1;
            }else {
                return 4;
            }
        }

        setState = (newState) => {
            return Object.assign(this.state, newState);
        }

        showDetails = () => {
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

                    let element = document.getElementById('details');
                    let el = document.getElementById('answs');
                    api.get(`/questions/details/${this.id}`, auth.getToken())
                        .then(res => res.json())
                        .then(data => {
                            if(Object.values(data).includes('Token has expired')) {
                                auth.removeToken();
                                window.location.reload();
                            }
                            else if (data) {
                                element.innerHTML = `
                                <div class="span-col-2">
                                    <h1>Question Details</h1>
                                    <hr>
                                    <div class="quiz">
                                        <ul class="qa">
                                            <p class="asheuh">Posted by ${data.data.question.id} on ${data.data.question.date_created}</p>
                                            <li class="no_dropdown">
                                                <h3>${data.data.question.title}</h3>
                                            </li>
                                            <div class="d-container">
                                                <ul class="stats">
                                                    <div class="new-container" style="padding-top: 3px; padding-bottom: 3px;">
                                                        <h4>Question</h4>
                                                        <p>${data.data.question.description}</p>
                                                        <div class="summary">
                                                            <a href="#" id="del" class="btn btn-danger">Delete Question</a>
                                                        </div>
                                                        <h4>Answers</h4>
                                                    </div>
                                                </ul>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div class="side-grid">
                                    <div class="grid-3" style="margin-top: 6em">
                                        <div class="summary" style="border: 1px solid green; text-align: center;">
                                            <h4 style="margin-top: 1em;">Total answers</h4>
                                            <h5><a href="#">${data.data.question.answers}</a></h5>
                                        </div>
                                    </div>
                                </div>
                                `;
                                del.addEventListener('click', event => {
                                    event.preventDefault();
                                    api.delete(`/questions/details/${this.id}`, auth.getToken())
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.message === "Question deleted successfully") {
                                                window.location.href = "/questions";
                                            }
                                            else if (data.message !== "Answer posted successfully") {
                                                alert(data.message);
                                            }
                                        });
                                });
                                let answer_data = data.data.answers;
                                if (answer_data.length === 0) {
                                    el.innerHTML = `
                                    <div class="panel pale-green">
                                        <p>There are no answers to this question yet, please post an answer</p>
                                    </div>
                                    `;
                                }
                                answer_data.forEach(function(item) {
                                    if (item) {
                                        let node = document.createElement('div');
                                        node.classList.add('answrs');
                                        node.innerHTML = `
                                            <div class="panel pale-green">
                                                <p class="asheuh">Answered by ${item.owner} on ${item.date_created}</p>
                                                <p>${item.answer}</p>
                                                <button style="background-color: #D6EAF8; color: black;" class="btn btn-success"><i class="fas fa-arrow-alt-circle-up"> ${item.votes}</i> Upvote</button>
                                                <button style="background-color: #D6EAF8; color: black;" class="btn btn-success"><i class="fas fa-arrow-alt-circle-down"></i> Downvote</button>
                                            </div>

                                        `;
                                        el.appendChild(node);
                                    }
                                });
                            }
                        });
                }
            });
        }

        postAnswer = () => {
            let box = document.getElementById("send");
            box.addEventListener('click', event => {
                event.preventDefault();
                const data = {
                    answer: answer.value
                };
                api.post(`/questions/${this.id}/answers`, data, auth.getToken())
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === "Answer posted successfully") {
                            window.location.reload();
                        }
                        else if (data.message !== "Answer posted successfully") {
                            let err = document.getElementById('msg');
                            err.style.display = "block";
                            err.style.backgroundColor = "#FCDFDF";
                            err.style.padding = "8px";
                            err.style.color = "red";
                            err.innerHTML = data.message;
                        }
                })
            })
        }
    }
    window.Details = Details;
}(window));

const details = new Details();
export default details;
