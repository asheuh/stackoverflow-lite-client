import auth from "../utils/auth";
import api from "../utils/api";
import temps from "../utils/templates";

(function(window) {
    class Details {
        constructor() {
            this.id = window.location.search.substr(1);
            this.showDetails();
            this.postAnswer();
        }
        showDetails = () => {
            if (!auth.UserIsLoggedIn()) {
                window.location.replace("/auth/login");
            } else if (auth.UserIsLoggedIn()) {
                api.get('/users/userprofile', auth.getToken())
                    .then(res => res.json())
                    .then(data => {
                        temps.profilePageLink(data);
                    });
                auth.logOut();
            }
            let element = document.getElementById('details');
            api.get(`/questions/details/${this.id}`, auth.getToken())
                .then(res => res.json())
                .then(data => {
                    if(Object.values(data).includes('Token has expired')) {
                        auth.removeToken();
                        window.location.href = "/auth/login";
                    }
                    else if (data) {
                        element.innerHTML = `
                        <div class="span-col-2">
                            <h1>Question Details</h1>
                            <hr>
                            <div class="quiz">
                                <ul class="qa">
                                    <p class="asheuh">Posted by ${data.data.id} on ${data.data.date_created}</p>
                                    <li class="no_dropdown">
                                        <h3>${data.data.title}</h3>
                                    </li>
                                    <div class="d-container">
                                        <ul class="stats">
                                            <div class="new-container">
                                                <h4>Question</h4>
                                                <p>${data.data.description}</p>
                                                <h4>Answers</h4>
                                                <div class="first span-col-3">
                                                    <div class="">
                                                        <hr>
                                                        <div class="panel pale-green">
                                                            <p>By Brian Mboya 20mins ago</p>
                                                            <p>London is the most populous city in the United Kingdom, with a metropolitan area of over 9 million inhabitants.</p>
                                                            <a href="#"><img class="image" style="border-radius: 50%; width: 20px; height: 20px;" src="../../static/images/tick-icon-44.png"></a>
                                                            <a href="#"><img class="image" style="border-radius: 50%; width: 20px; height: 20px;" src="../../static/images/x.png"></a>
                                                        </div>
                                                        <div class="panel pale-green">
                                                            <p>By Stacy Mboya 20mins ago</p>
                                                            <p>London is the most populous city in the United Kingdom, with a metropolitan area of over 9 million inhabitants.</p>
                                                            <a href="#"><img class="image" style="border-radius: 50%; width: 20px; height: 20px;" src="../../static/images/tick-icon-44.png"></a>
                                                            <a href="#"><img class="image" style="border-radius: 50%; width: 20px; height: 20px;" src="../../static/images/x.png"></a>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    <h5><a href="#">${data.data.answers}</a></h5>
                                </div>
                            </div>
                        </div>

                        `;
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
