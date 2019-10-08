import alt from '../alt';
import RequestsActions from "../actions/RequestsActions";

class RequestsStore {
    constructor() {
        this.requests = [];
        this.statistics = {};
        this.fetchingRequests = false;

        this.bindListeners({
            handleFetchRequests: RequestsActions.fetchRequests,
            handleFetchRequestsComplete: RequestsActions.fetchRequestsComplete,
	        handleFetchStatistics: RequestsActions.fetchStatistics,
	        handleFetchStatisticsComplete: RequestsActions.fetchStatisticsComplete,

        });
    }

    handleFetchRequests() {
        this.fetchingRequests = true;
        this.requests = [];
    }

    handleFetchRequestsComplete(requests) {
        this.fetchingRequests = false;
        this.requests = requests;
    }

    handleFetchStatistics() {
        this.statistics = [];
    }

    handleFetchStatisticsComplete(statistics) {
        this.statistics = statistics;
    }
}

export default alt.createStore(RequestsStore, 'RequestsStore');