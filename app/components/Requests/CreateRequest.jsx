import React from 'react';
import RequestsActions from "../../actions/RequestsActions";

export default class CreateRequest extends React.Component {

	constructor() {
		super();
		this.state = {
			formChanged: false,
			approvers: [
				{id: 1, name: "Ion Popescu"},
				{id: 2, name: "Mircea Ionescu"}
			]
		};
	}

	onSubmit() {
		event.preventDefault();
		RequestsActions.createRequest({
			requesterId: this.props.requesterId,
			firstApprover: this.state.firstApprover
		});
		this.props.onCreateCompleted();
	}

	inputChanged = (value) => {
		this.setState({...value, formChanged: true});
		console.log(this.props);
		console.log(this.state);
	};

	render() {
		return(
			<div>

				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor="approver">Approver</label>
						<select name="" id="approver" className="form-control" required onChange={(event) => {
							this.inputChanged({firstApprover: event.target.value});}}>
							<option>Select Approver</option>
							{this.state.approvers.map((approver) =>
								<option key={approver.id} value={approver.id}>
									{approver.name}
								</option>
							)}
						</select>
					</div>
					<button type="submit" className="btn btn-primary" disabled={!this.state.formChanged}>Complete</button>
				</form>
			</div>
		);
	}
}