import alt from "../alt";
import axios from 'axios';
import HttpUtils from '../components/Common/HttpUtils';

class AccountActions {

	fetchAccount() {
		const requestOptions = HttpUtils.getDefaultOptions();
		requestOptions.url = requestOptions.baseURL + 'api/account';

		axios(requestOptions)
			.then((response) => this.fetchAccountComplete(response.data))
			.catch((err) => console.log(err));

		return null;
	}

	fetchAccountComplete(data) {
		return data;
	}

	fetchUsersByRole(level) {
		const requestOptions = HttpUtils.getDefaultOptions();
		requestOptions.url = requestOptions.baseURL + 'api/users/approvers/' + level;

		axios(requestOptions)
			.then((response) => this.fetchUsersByRoleCompleted(response.data))
			.catch((err) => console.log(err));

		return null;
	}

	fetchUsersByRoleCompleted(data) {
		return data;
	}
}

export default alt.createActions(AccountActions);