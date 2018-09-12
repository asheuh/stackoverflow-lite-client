import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";
import temps from "../utils/templates";

const fetchQuestions = () => {

    if (!auth.UserIsLoggedIn()) {
        window.location.href = "../../templates/mains/signin.html";
    }
    else if (auth.UserIsLoggedIn()) {
        api.get('/users/userprofile', auth.getToken())
            .then(res => res.json())
            .then(data => {
                temps.profilePageLink(data);
            });
        auth.logOut();
    }
    api.get("/questions", auth.getToken())
        .then(res => res.json())
        .then(data => {
            for (let i in data.data) {
                let parentNode = document.getElementById("msg");
                let quizBody = temps.questionBody(data, i);
                let node = document.createElement("div");
                node.classList.add("quiz");
                node.innerHTML = quizBody;
                parentNode.appendChild(node);
            }
        });
}

fetchQuestions();
