import api from "../utils/api";

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
        .then(data => console.log(data));
});
