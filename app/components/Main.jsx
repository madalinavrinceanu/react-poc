import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import RequestsPage from "./Requests/RequestsPage";

class Main extends React.Component {
	render() {
		return (
			<main>
				<Route path="/requests" render={() => <RequestsPage />}></Route>
				<Route path="/*" render={() => <Redirect to="/requests"/>}></Route>
			</main>
		);
	}
}
export default Main;