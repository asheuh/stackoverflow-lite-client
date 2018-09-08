import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";
import question from "../utils/questionTemps";

const fetchQuestions = () => {
    if (auth.UserIsLoggedIn()) {
        auth.logOut();
    }
    api.get("/questions", auth.getToken())
        .then(res => res.json())
        .then(data => {
            for (let i in data.data) {
                let parentNode = document.getElementById("msg");
                let quizBody = question.questionBody(data, i);
                let node = document.createElement("div");
                node.classList.add("quiz");
                node.innerHTML = quizBody;
                parentNode.appendChild(node);
                console.log(parentNode)
            }
        });
}

fetchQuestions();
