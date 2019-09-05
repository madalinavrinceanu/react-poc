import alt from "../alt";
import LogoutActions from "../actions/LogoutActions";

class LogoutStore {
	constructor() {
		this.token = null;
		this.user = null;
		this.roles = [];
		this.isUserAuthenticated = false;

		this.bindListeners({
			handleLogoutCompleted: LogoutActions.logoutComplete
		});
	}

	handleLogoutCompleted() {
		this.token = null;
		this.user = null;
		this.roles = null;
		this.isUserAuthenticated = false;
		window.localStorage.removeItem("authToken");
	}

}

export default alt.createStore(LogoutStore, 'LogoutStore');