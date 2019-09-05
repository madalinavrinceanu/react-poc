import React from 'react';
import {Modal} from "react-bootstrap";
import _ from "lodash";

import AssignApprover from "./AssignApprover";
import WithStoreSubscription from "../Common/hocs/WithStoreSubscriptions";
import RequestsStore from "../../stores/RequestsStore";
import RequestsActions from "../../actions/RequestsActions";
import LoginStore from "../../stores/LoginStore";
import LoginActions from "../../actions/LoginActions";

@WithStoreSubscription([RequestsStore, LoginStore], [RequestsActions.fetchRequests.defer])
class RequestsPage extends React.Component{

	constructor() {
		super();
		this.state = {
			requests: [],
			fetchingRequests: false
		};
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

        const renderStatus = (request, number) => request["approver" + number] === this.props.user ? (request["status" + number] === "Pending" ? <div className="btn-group-sm" role="group">
            <button type="button" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Approve</button>
            <button type="button" className="btn btn-secondary">Decline</button>
        </div> : request["status" + number]) : request["status" + number];

		const renderRequests = _.map(this.props.requests, request => {
            return (
                <tr key={request.processId}>
                    <th scope="row">{request.processId}</th>
					<td>{request.requester}</td>
                    <td>{request.approver1 || '-'}</td>
                    <td>{renderStatus(request, 1) || '-'}</td>
                    <td>{request.approver2 || '-'}</td>
                    <td>{renderStatus(request, 2) || '-'}</td>
                    <td>{request.approver3 || '-'}</td>
                    <td>{renderStatus(request, 3) || '-'}</td>
                </tr>
            );
        });

		return (<React.Fragment>
			<h1>Requests</h1>

			{/*<input type="submit" className="float-right" value="Create Request" onClick={this.onSubmit.bind(this)}/>*/}
			{this.renderAssignModal()}
			<div className="standard-container">
				<table className="table table-striped">
					<thead>
					<tr>
						<th scope="col">PID</th>
						<th scope="col">Requester</th>
						<th scope="col">First Approver</th>
						<th scope="col">Status</th>
						<th scope="col">Second Approver</th>
						<th scope="col">Status</th>
						<th scope="col">Third Approver</th>
						<th scope="col">Status</th>
					</tr>
					</thead>
					<tbody>
					{renderRequests}
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