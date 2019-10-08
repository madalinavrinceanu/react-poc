import alt from "../alt";
import axios from 'axios';
import HttpUtils from '../components/Common/HttpUtils';

class RequestsActions {

    fetchRequests(userId, page, size) {
        const requestOptions = HttpUtils.getDefaultOptions();
        if(page && size) {
	        requestOptions.url = requestOptions.baseURL + 'api/requests/' + userId + "?page=" + page + "&size=" + size;
        } else {
	        requestOptions.url = requestOptions.baseURL + 'api/requests/' + userId;
        }
        requestOptions.method = 'GET';

        axios(requestOptions)
            .then((response) => this.fetchRequestsComplete(response.data))
            .catch();

        return null;
    }

    fetchRequestsComplete(data) {
    	this.fetchStatistics();
        return data;
    }

    createRequest(userId, requestParams) {
	    const requestOptions = HttpUtils.getDefaultOptions();
	    requestOptions.url = requestOptions.baseURL + 'api/requests';
	    requestOptions.method = 'POST';
	    requestOptions.data = requestParams;

	    axios(requestOptions)
		    .then((response) => this.fetchRequests(userId))
		    .catch((err) => this.createRequestComplete);

	    return null;
    }

	createRequestComplete(data) {
    }

    completeRequest(taskId, userId, requestParams) {
	    const requestOptions = HttpUtils.getDefaultOptions();
	    requestOptions.url = requestOptions.baseURL + 'api/requests/complete/' + taskId;
	    requestOptions.method = 'POST';
	    requestOptions.data = requestParams;

	    axios(requestOptions)
		    .then((response) => this.fetchRequests(userId))
		    .catch((err) => this.createRequestComplete);

	    return null;
    }

    startTaskRequest(taskId) {
	    const requestOptions = HttpUtils.getDefaultOptions();
	    requestOptions.url = requestOptions.baseURL + 'api/requests/start/' + taskId;
	    requestOptions.method = 'POST';

	    axios(requestOptions)
		    .then((response) => this.createRequestComplete(response.data))
		    .catch((err) => this.createRequestComplete);

	    return null;
    }

    declineRequest(taskId, userId, requestParams) {
	    const requestOptions = HttpUtils.getDefaultOptions();
	    requestOptions.url = requestOptions.baseURL + 'api/requests/decline/' + taskId;
	    requestOptions.method = 'POST';
	    requestOptions.data = requestParams;

	    axios(requestOptions)
		    .then((response) => this.fetchRequests(userId))
		    .catch((err) => this.createRequestComplete);

	    return null;
    }

    fetchStatistics() {
	    const requestOptions = HttpUtils.getDefaultOptions();
	    requestOptions.url = requestOptions.baseURL + 'api/requests/statistics';

	    requestOptions.method = 'GET';

	    axios(requestOptions)
		    .then((response) => this.fetchStatisticsComplete(response.data))
		    .catch();

	    return null;
    }

	fetchStatisticsComplete(data) {
		return data;
	}

}

export default alt.createActions(RequestsActions);