import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";

const fetchQuestions = () => {
    api.get("/questions", auth.getToken())
        .then(res => res.json())
        .then(data => {
            for (let i in data) {
                console.log(data[i])
            }
        });
}

fetchQuestions()
