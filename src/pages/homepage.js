import auth from "../utils/auth";

class HomePage {
    constructor() {
        this.GetProtectedRoute();
    };

    GetProtectedRoute = () => {
        if (auth.UserIsLoggedIn()) {
            window.location.href = "/questions";
        }
        return false;
    }
}

const home = new HomePage();
export default home;
