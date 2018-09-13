import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

(function(window) {
    class Questions {
        constructor() {
            this.fetchQuestions();
        }
        fetchQuestions = () => {

            if (!auth.UserIsLoggedIn()) {
                window.location.href = "/auth/login";
            } else if (auth.UserIsLoggedIn()) {
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
                    if (Object.values(data).includes("Token has expired")) {
                        auth.removeToken();
                        window.location.href = "/auth/login";
                    }
                });
        }
    }
    window.Questions = Questions;
}(window));

const question = new Questions;
export default question;
