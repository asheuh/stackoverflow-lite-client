class Api {
    constructor() {
        this.baseUrl = "https://stackoverflow-lite-heroku.herokuapp.com/api/v2";
    }

    post(endpoint, data, token = null) {
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }

    get(endpoint, token) {
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }
    delete(endpoint, token) {
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }

    patch(endpoint, token) {
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }
}

const api = new Api();
export default api;
