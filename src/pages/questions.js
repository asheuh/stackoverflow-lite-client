import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";

question.addEventListener("click", event => {
    event.preventDefault();

    const data = {
        title: title.value,
        description: description.value
    };

    api.post("/questions", data, auth.getToken())
        .then(res => res.json())
        .catch(error => console.error('Error '+ error))
        .then(data => {
            if (data.message === "Question posted successfully") {
                /*let status = document.getElementById('msg')
                status.style.backgroundColor = "#F0FAEE";
                status.style.padding = "8px";
                status.style.color = "#259814";
                status.innerHTML = data.message;*/
                console.log(data.message)
            }
        });
});

