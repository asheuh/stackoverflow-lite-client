import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";

register.addEventListener("click", event => {
    event.preventDefault();

    const data = {
        name: fullname.value,
        username: username.value,
        email: email.value,
        password: password.value
    };

    api
        .post("/auth/register", data)
        .then(res => res.json())
        .catch(error => console.error('Error '+ error))
        .then(data => {
            if (data.message === "User created successfully") {
                auth.setToken(data.access_token);
               /* let message = document.getElementById('message')
                message.style.backgroundColor = "#F0FAEE";
                message.style.padding = "8px";
                message.style.color = "#259814";
                message.innerHTML = data.message;*/
                redirect: window.location.replace("../../templates/mains/home.html");
                //window.location.reload()
            }
            else if (data.message !== "User created successfully") {
                let err = document.getElementById('message')
                for (let key in data.message) {
                    err.style.display = 'block'
                    err.style.backgroundColor = "#FCDFDF";
                    err.style.padding = "8px";
                    err.style.color = "red";
                    err.innerHTML = data.message[key];
                }
            } else {
                window.location.reload()
            }
        });
});
