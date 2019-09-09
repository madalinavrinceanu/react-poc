import alt from "../alt";
import AccountActions from "../actions/AccountActions";

class AccountStore {
	constructor() {
		this.user = null;
		this.roles = [];
		this.isUserAuthenticated = false;
		this.userId = null;
		this.users = [];

		this.bindListeners({
			fetchAccount: AccountActions.fetchAccount,
			fetchAccountComplete: AccountActions.fetchAccountComplete,
			fetchUsersByRole: AccountActions.fetchUsersByRole
		});
	}

	fetchAccount() {
		this.user = null;
		this.roles = [];
	}

	fetchAccountComplete(data) {
		this.user = data.login;
		this.userId = data.id;
		this.roles = data.authorities;
		this.isUserAuthenticated = true;
	}

	fetchUsersByRole(data) {
		this.users = data;
	}
}

export default alt.createStore(AccountStore , 'AccountStore');