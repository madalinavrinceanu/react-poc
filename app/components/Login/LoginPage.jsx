import React from "react";
import LoginActions from "../../actions/LoginActions";

class LoginPage extends React.Component {

	constructor() {
		super();
		this.state = {
			formChanged: false
		};
	}

	onSubmit() {
		event.preventDefault(); //previne un refresh pentru ca submit face si render
		console.log(this.state);
		LoginActions.login({
			username: this.state.username,
			password: this.state.password,
			submit: "Login"
		});
	}

	inputChanged = (value) => {
		this.setState({...value, formChanged: true});
	};

	render() {
		return(
			<div className="wrapper">
				<div id="formContent">
					<h1 className="pt-3">Request Approval</h1>
					<form onSubmit={this.onSubmit.bind(this)}>
						<input type="text" id="login" required placeholder="username" name="login" className="fadeIn second"
						       onChange={(event) => {
							       this.inputChanged({username: event.target.value});
						       }}/>
						<input type="password" id="password" required placeholder="password" name="login" className="fadeIn third"
						       onChange={(event) => {
							       this.inputChanged({password: event.target.value});
						       }}/>

						<input type="submit" className="fadeIn fourth pt-2" value="Log In" disabled={!this.state.formChanged}/>
					</form>
				</div>
			</div>
		);
	};
}

export default LoginPage;