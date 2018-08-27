import api from "../utils/api";

login.addEventListener("click", event => {
    event.preventDefault();

    const data = {
        username: username.value,
        password: password.value
    };

    api.post("/auth/login", data)
        .then(res => res.json())
        .then(data => console.log(data));
});
