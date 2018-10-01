import api from "../utils/api";
import auth from "../utils/auth";
import temps from "../utils/templates";

class Helpers {
	handleProfileLink(callback) {
		api.get("/users/userprofile", auth.getToken())
			.then(response => response.json())
			.then(data => {
				document.getElementById("page").style.display = "block";
				document.getElementById("loader").style.display = "none";
				temps.profilePageLink(data);
			});
		auth.logOut();
	}
}

const helper = new Helpers();
export default helper;
