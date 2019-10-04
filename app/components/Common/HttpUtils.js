export default class HttpUtils {
	/**
	 * Gets the default option values for http requests
	 */
	static getDefaultOptions() {
		return {
			baseURL: '',
			method: 'GET',
			withCredentials: true
		};
	}
}