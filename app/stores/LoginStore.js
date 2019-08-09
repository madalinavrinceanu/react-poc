import alt from "../alt";
import LoginActions from "../actions/LoginActions";

class LoginStore {
	constructor() {
		this.token = null;
		this.user = null;
		this.roles = [];
		this.isUserAuthenticated = false;

		this.bindListeners({
			handleLogin: LoginActions.login,
			handleLoginCompleted: LoginActions.loginComplete
		});
	}

	handleLogin() {
		this.token = null;
		this.user = null;
		this.roles = [];
		this.isUserAuthenticated = false;
	}

	handleLoginCompleted(data) {
		this.token = data.token;
		this.user = data.username;
		this.roles = data.roles;
		this.isUserAuthenticated = true;
		window.localStorage.setItem("authToken", data.token);
	}
}

export default alt.createStore(LoginStore, 'LoginStore');