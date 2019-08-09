import React from 'react';

export default class AssignApprover extends React.Component {

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
		event.preventDefault(); //previne un refresh pentru ca submit face si render
		// ApproverActions.assign({
		// 	nextApprover: this.state.nextApprover
		// });
		this.props.onAssignCompleted();
	}

	inputChanged = (value) => {
		this.setState({...value, formChanged: true});
	};

	render() {
		return(
			<div>

				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor="approver">Approver</label>
						<select name="" id="approver" className="form-control" required onChange={(event) => {
							this.inputChanged({approver: event.target.value});}}>
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