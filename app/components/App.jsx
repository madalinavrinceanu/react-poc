import React from 'react';
import Main from './Main';

import LoginPage from './Login/LoginPage';

import WithStoreSubscription from "./Common/hocs/WithStoreSubscriptions";
import LoginStore from "../stores/LoginStore";

@WithStoreSubscription([LoginStore])
class App extends React.Component {

	render() {

		if(!this.props.isUserAuthenticated) {
			return <LoginPage/>;
		}

		return (<div>
			<Main></Main>
		</div>);
	}
}

export default App;