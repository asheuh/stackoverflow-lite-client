class Api {
    constructor() {
        this.baseUrl = "http://stackoverflow-lite-heroku.herokuapp.com/api/v2";
    }

    post(endpoint, data, token = null) {
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }
}

const api = new Api();
export default api;
