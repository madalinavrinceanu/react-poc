import React from 'react';
import RequestsActions from "../../actions/RequestsActions";
import WithStoreSubscription from "../Common/hocs/WithStoreSubscriptions";
import AccountActions from "../../actions/AccountActions";
import AccountStore from "../../stores/AccountStore";
import RequestsStore from "../../stores/RequestsStore";

// @WithStoreSubscription([AccountStore], [AccountActions.fetchUsersByRole.defer])
class AssignApprover extends React.Component {

	constructor() {
		super();
		this.state = {
			formChanged: false,
			approvers: []
		};
	}

	componentDidMount() {
		AccountStore.listen(this.onAccountStoreChanged);
		AccountActions.fetchUsersByRole.defer(this.props.request.status1 === "PENDING" ? 2 : 3);
	}

	componentWillUnmount() {
		AccountStore.unlisten(this.onAccountStoreChanged);
	}

	onAccountStoreChanged = store => {
		this.setState({...store});
		console.log(this.state);
	};

	onSubmit() {
		event.preventDefault();
		var level = this.props.request.status1 === "PENDING" ? 2 : 3;
		RequestsActions.completeRequest(
				this.props.request.taskId,
				{
					[level === 2 ? 'secondApprover' : 'thirdApprover']: this.state.approver,
					["status" + (level-1)]: "APPROVED"
				}
			);
		this.props.onAssignCompleted();
	}

	inputChanged = (value) => {
		this.setState({...value, formChanged: true});
		console.log(this.state);
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
									{approver.firstName} {approver.lastName}
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

export default AssignApprover;