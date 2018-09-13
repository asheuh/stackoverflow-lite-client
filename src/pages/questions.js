import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

const postQuestion = () => {
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

    question.addEventListener("click", event => {
        event.preventDefault();
        const data = {
            title: title.value,
            description: description.value
        };

        api.post("/questions/newquestion", data, auth.getToken())
            .then(res => res.json())
            .catch(error => console.error('Error ' + error))
            .then(data => {
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

postQuestion();
