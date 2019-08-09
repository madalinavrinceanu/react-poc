import alt from "../alt";
import axios from 'axios';
import HttpUtils from '../components/Common/HttpUtils';

class LoginActions {

	login(requestParams) {
		const requestOptions = HttpUtils.getDefaultOptions();
		requestOptions.url = requestOptions.baseURL + '/auth/login';
		requestOptions.method = 'POST';
		requestOptions.data = requestParams;

		axios(requestOptions)
			.then((response) => this.loginComplete(response.data))
			.catch((err) => console.log(err));

		return null;
	}

	loginComplete(data) {
		return data;
	}
}

export default alt.createActions(LoginActions);