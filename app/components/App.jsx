import React from 'react';
import Main from './Main';
import { withRouter } from "react-router";

import LoginPage from './Login/LoginPage';

import WithStoreSubscription from "./Common/hocs/WithStoreSubscriptions";
import LoginStore from "../stores/LoginStore";
import HorizontalNavbar from "./Navigation/HorizontalNavbar";
import LogoutStore from "../stores/LogoutStore";
import AccountStore from "../stores/AccountStore";

@WithStoreSubscription([LoginStore, LogoutStore, AccountStore])
class App extends React.Component {

	render() {

		var isUserAuthenticated = window.localStorage.getItem("isUserAuthenticated");

		if(!isUserAuthenticated) {
			return <LoginPage/>;
		}

		return (<div>
			<HorizontalNavbar user={this.props.user}/>
			<Main></Main>
		</div>);
	}
}

export default withRouter(App);