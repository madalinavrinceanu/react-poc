import React from 'react';
import {Modal} from "react-bootstrap";

import AssignApprover from "./AssignApprover";

class RequestsPage extends React.Component{

	constructor() {
		super();
		this.state = {

		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	onAssignCompleted = () => {
		this.setState({show:false});
	};

	onSubmit() {
		event.preventDefault();
		this.setState({show:true});
		console.log(this.state);

	}

	render() {
		return (<React.Fragment>
			<h1>Requests</h1>

			{/*<input type="submit" className="float-right" value="Create Request" onClick={this.onSubmit.bind(this)}/>*/}
			{this.renderAssignModal()}
			<div className="standard-container">
				<table className="table table-striped">
					<thead>
					<tr>
						<th scope="col">PID</th>
						<th scope="col">First Approver</th>
						<th scope="col">Status</th>
						<th scope="col">Second Approver</th>
						<th scope="col">Status</th>
						<th scope="col">Third Approver</th>
						<th scope="col">Status</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark Jacob</td>
						<td>
							<div className="btn-group-sm" role="group">
								<button type="button" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Approve</button>
								<button type="button" className="btn btn-secondary">Decline</button>
							</div>
						</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Sean Duncan</td>
						<td>Approved</td>
						<td>Zion Bradley</td>
						<td>Approved</td>
						<td>Will Jenkins</td>
						<td>Declined</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>John Braun</td>
						<td>Approved</td>
						<td>Zion Bradley</td>
						<td>Pending</td>
						<td>-</td>
						<td>-</td>
					</tr>
					</tbody>
				</table>
			</div>
			</React.Fragment>);
	}


	renderAssignModal = () => {
		return (
			<Modal show={this.state.show} onHide={() => this.onAssignCompleted()}>
				<Modal.Header closeButton>
					<Modal.Title>Assign next approver</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AssignApprover onAssignCompleted={() => this.onAssignCompleted()}></AssignApprover>
				</Modal.Body>
			</Modal>
		);
	};


}


export default RequestsPage;