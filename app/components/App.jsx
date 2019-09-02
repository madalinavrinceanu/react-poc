import React from 'react';
import Main from './Main';

import LoginPage from './Login/LoginPage';

import WithStoreSubscription from "./Common/hocs/WithStoreSubscriptions";
import LoginStore from "../stores/LoginStore";
import HorizontalNavbar from "./Navigation/HorizontalNavbar";

@WithStoreSubscription([LoginStore])
class App extends React.Component {

	render() {

		if(!this.props.isUserAuthenticated) {
			return <LoginPage/>;
		}

		return (<div>
			<HorizontalNavbar user={this.props.user}/>
			<Main></Main>
		</div>);
	}
}

export default App;