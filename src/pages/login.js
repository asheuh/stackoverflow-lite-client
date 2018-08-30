import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";

login.addEventListener("click", event => {
    event.preventDefault();

    const data = {
        username: username.value,
        password: password.value
    };

    api.post("/auth/login", data)
        .then(res => res.json())
        .catch(error => console.error('Error '+ error))
        .then(data => {
            if (data.message === "Successfully logged in") {
                let status = document.getElementById('message')
                auth.setToken(data.access_token);
                status.style.backgroundColor = "#F0FAEE";
                status.style.padding = "8px";
                status.style.color = "#259814";
                status.innerHTML = data.message;
                window.location.reload();
                redirect: window.location.replace("../../templates/mains/home.html");
            } else {
                let err = document.getElementById('message')
                err.style.backgroundColor = "#FCDFDF";
                err.style.padding = "8px";
                err.style.color = "red";
                err.innerHTML = data.message;
            }
        });
});
