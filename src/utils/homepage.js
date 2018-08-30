import auth from "../utils/auth";

class HomePage {

    GetProtectedRoute = (route) => {
        return route;
    }

    UserLogout = () => {
        auth.removeToken();
    }
}

const home = new HomePage();
export default home;
