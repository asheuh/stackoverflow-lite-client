import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

(function(window) {
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
        };

        setState = (newState) => {
            return Object.assign(this.state, newState);
        }

        userProfile = () => {
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
                            if (Object.values(data).includes('Token has expired')) {
                                auth.removeToken();
                                window.location.reload();
                            }
                            temps.profilePageLink(data);
                            let element = document.getElementById("myprofile");
                            element.innerHTML = `
                                <div class="span-col-5">
                                    <h1 style="margin-top: 1em">${data.data.name}(${data.data.username})</h1>
                                    <p>Email: <i>${data.data.email}</i></p>
                                    <p>Username: <i>${data.data.username}</i></p>
                                    <p>Name: <i> ${data.data.name}</i></p>
                                    <p>Registered on: <i>${data.data.registered_on}</i></p>
                                    <div class="social-icons">
                                        <a href="#"><i style="color:blue;" class="me fab fa-facebook-square"></i></a>
                                        <a href="#"><i style="color:#ffc838" class="me fab fa-instagram"></i></a>
                                        <a href="#"><i style="color:#3498DB;" class="me fab fa-twitter-square"></i></a>
                                        <a href="#"><i style="color:#21618C;" class="me fab fa-linkedin-in"></i></a>
                                        <a href="#"><i style="color:red;" class="me fab fa-google-plus-square"></i></a>
                                        <a href="#"><i style="color:black;" class="me fab fa-github-square"></i></a>
                                    </div>
                                </div>
                            `;
                        });
                    auth.logOut();
                }
            });
        }

        mostAnsweredQuestion = () => {
            let el = document.getElementById("mostanswer");
            api.get('/questions/mostanswers', auth.getToken())
                .then(res => res.json())
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
                            let node = document.createElement('div');
                            node.classList.add('quiz');
                            node.innerHTML = `
                            <ul class="qa">
                                <p class="asheuh">Asked by me on ${item.date_created}</p>
                                <li class="d">
                                    <a href="/questions/details/?${item.id}">${item.title}</a>
                                </li>
                                <div class="d-container">
                                    <ul class="stats">
                                        <div class="new-container">
                                            <h2>Question summary</h2>
                                            <p>${item.description}</p>
                                            <div class="grid-3">
                                                <div class="summary">
                                                    <h4>Total answers</h4>
                                                    <h5><a href="#">${item.answers}</a></h5>
                                                </div>
                                                <div class="summary">
                                                    <a style="background-color: #D6EAF8; color: black;" class="btn btn-primary" href="/questions/details/?${item.id}">view answers</a>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </ul>
                            `;
                            el.appendChild(node);
                        }
                    });
            });
        }

        myQuestions = () => {
            if(!auth.UserIsLoggedIn()) {
                window.location.href = "/auth/login";
            }
            else if (auth.UserIsLoggedIn()) {
                api.get('/users/userprofile', auth.getToken())
                    .then(res => res.json())
                    .then(data => {
                        temps.profilePageLink(data);
                })
                auth.logOut();
            }
            api.get('/questions/myquestions', auth.getToken())
                .then(res => res.json())
                .then(data => {
                    let parentNode = document.getElementById('myquestion');
                    if (data.message === "There are no questions in the db for you") {
                        parentNode.innerHTML = `
                            <div class="panel pale-green">
                                <p>${data.message}, feel free to post your questions</p>
                            </div>
                            `;
                    }
                    let mydata = data.data;
                    mydata.forEach(function(item) {
                        let node = document.createElement('div');
                        node.classList.add('quiz');
                        node.innerHTML = `
                        <ul class="qa">
                            <p class="asheuh">Asked by me on ${item.date_created}</p>
                            <li class="d">
                                <a href="/questions/details/?${item.id}">${item.title}</a>
                            </li>
                            <div class="d-container">
                                <ul class="stats">
                                    <div class="new-container">
                                        <h2>Question summary</h2>
                                        <p>${item.description}</p>
                                        <div class="grid-3">
                                            <div class="summary">
                                                <h4>Total answers</h4>
                                                <h5><a href="#">${item.answers}</a></h5>
                                            </div>
                                            <div class="summary">
                                                <a style="background-color: #D6EAF8; color: black;" class="btn btn-primary" href="/questions/details/?${item.id}">view answers</a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </ul>
                        `;
                        parentNode.appendChild(node);
                    });
                });
        }
    }
    window.Profile = Profile;
}(window));

const profile = new Profile();
export default profile;
