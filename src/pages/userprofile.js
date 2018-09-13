import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

(function(window) {
    class Profile {
        constructor() {
            this.userProfile();
            this.mostAnsweredQuestion();
            this.myQuestions();
        };

        userProfile = () => {
            if (!auth.UserIsLoggedIn()) {
                window.location.href = "/auth/login";
            } else if (auth.UserIsLoggedIn()) {
                api.get('/users/userprofile', auth.getToken())
                    .then(res => res.json())
                    .then(data => {
                        if (Object.values(data).includes('Token has expired')) {
                            auth.removeToken();
                            window.location.reload();
                        }
                        temps.profilePageLink(data);
                        let element = document.getElementById("myprofile");
                        element.innerHTML = `
                            <div>
                                <img style="width: 200px; border-radius: 12em;" src="../../static/images/asheuh.jpeg">
                            </div>
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
        }
        mostAnsweredQuestion = () => {
            let el = document.getElementById("mostanswer");
            api.get('/questions/mostanswers', auth.getToken())
                .then(res => res.json())
                .then(data => {
                    let result = data.data;
                    result.forEach(function(item) {
                        if (item) {
                            let node = document.createElement('div');
                            node.classList.add('quiz');
                            node.innerHTML = `
                            <ul class="qa">
                                <p class="asheuh">Asked by ${item.created_by} on ${item.date_created}</p>
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
                                                <div class="summary">
                                                    <a href="#" class="btn btn-danger">Delete Question</a>
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
                    let mydata = data.data;
                    let parentNode = document.getElementById('myquestion');
                    mydata.forEach(function(item) {
                        let node = document.createElement('div');
                        node.classList.add('quiz');
                        node.innerHTML = `
                        <ul class="qa">
                            <p class="asheuh">Asked by ${item.created_by} on ${item.date_created}</p>
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
                                            <div class="summary">
                                                <a href="#" class="btn btn-danger">Delete Question</a>
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
