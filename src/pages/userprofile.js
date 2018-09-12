import api from "../utils/api";
import auth from "../utils/auth";
import home from "../utils/homepage";
import temps from "../utils/templates";

const userProfile = () => {
    if (!auth.UserIsLoggedIn()) {
        window.location.href = "/auth/login";
    } else if (auth.UserIsLoggedIn()) {
        api.get('/users/userprofile', auth.getToken())
            .then(res => res.json())
            .then(data => {
                temps.profilePageLink(data);
            });
        auth.logOut();
    }
}

userProfile();