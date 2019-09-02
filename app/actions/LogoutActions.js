import alt from '../alt';
import axios from 'axios';
import HttpUtils from '../components/Common/HttpUtils';

class LogoutActions {

    logout() {
        const token = window.localStorage.getItem("authToken");
        const requestOptions = HttpUtils.getDefaultOptions();
        requestOptions.url = requestOptions.baseURL + '/auth/logout?token=' + token;
        requestOptions.method = 'POST';

        axios(requestOptions)
            .then((response) => this.logoutComplete())
            .catch((err) => console.log(err));

        return null;
    }

    logoutComplete() {
        return null;
    }
}

export default alt.createActions(LogoutActions);