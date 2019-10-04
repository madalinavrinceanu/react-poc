import React from 'react';
import {Modal} from "react-bootstrap";
import _ from "lodash";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import AssignApprover from "./AssignApprover";
import RequestsStore from "../../stores/RequestsStore";
import RequestsActions from "../../actions/RequestsActions";
import AccountStore from "../../stores/AccountStore";
import AccountActions from "../../actions/AccountActions";
import CreateRequest from "./CreateRequest";

class RequestsPage extends React.Component{

	constructor() {
		super();
		this.state = {
			requests: [],
			fetchingRequests: false
		};
	}

	componentDidMount() {
		AccountStore.listen(this.onAccountStoreChanged);
		AccountActions.fetchAccount.defer();

		RequestsStore.listen(this.onRequestStoreChanged);
	}

	componentWillUnmount() {
		RequestsStore.unlisten(this.onRequestStoreChanged);
	}

	onRequestStoreChanged = store => {
		this.setState({...store});
		console.log(this.state);
	};

	onAccountStoreChanged = store => {
		this.setState({...store});
		if(store.userId && this.state.requests.length === 0) {
			RequestsActions.fetchRequests.defer(store.userId);
		}
	};

	onSubmitAssign(taskId, number) {
		event.preventDefault();
		this.setState({showAssignModal:true});
		RequestsActions.startTaskRequest(taskId);

		if(number === 3) {
			RequestsActions.completeRequest(
				taskId,
				{
					thirdApprover: this.props.userId,
					status3: "APPROVED"
				}
			);
		}
	}

	onDecline(taskId, level) {
		event.preventDefault();
		RequestsActions.declineRequest(taskId, {["status" + level] : "DECLINED"});
	}

	onAssignCompleted = () => {
		this.setState({showAssignModal:false});
	};

	onSubmitCreate() {
		event.preventDefault();
		this.setState({showCreateModal:true});
	}

	onCreateCompleted() {
		this.setState({showCreateModal:false});
	}

	render() {
		const renderStatus = (request, number) => request["approver" + number] === this.state.userId ? (request["status" + number] === "PENDING" ?
	        <span>
		        <a href=""><FontAwesomeIcon style={{color:"green"}} icon={faCheck}  onClick={() => this.onSubmitAssign(request.taskId, number)}/></a>
		        <a href=""><FontAwesomeIcon style={{color:"red"}} icon={faTimes} onClick={() => this.onDecline(request.taskId, number)}/></a>
		        {this.renderAssignModal(request)}
	        </span>

	        : request["status" + number]) : request["status" + number];

		const renderRequests = _.map(this.state.requests, request => {
            return (
	            <React.Fragment>
		            <tr key={request.processInstanceId}>
			            <th scope="row">{request.processInstanceId}</th>
			            <th>{request.date || '-'}</th>
			            <td>{request.requesterName}</td>
			            <td>
				            <p>{request.approver1Name || '-'}</p>
				            <p>{renderStatus(request, 1) || '-'}</p>
			            </td>
			            <td>
				            <p>{request.approver2Name || '-'}</p>
				            <p>{renderStatus(request, 2) || '-'}</p>
			            </td>
			            <td>
				            <p>{request.approver3Name || '-'}</p>
				            <p>{renderStatus(request, 3) || '-'}</p>
			            </td>
		            </tr>
	            </React.Fragment>
            );
        });

		return (<React.Fragment>
			<h1>Requests</h1>
			{this.renderCreateModal()}
			{this.renderCreateButton()}

			<div className="standard-container">
				<table className="table table-striped" style={{textAlign: "center"}}>
					<thead>
					<tr>
						<th scope="col">PID</th>
						<th scope="col">Date</th>
						<th scope="col">Requester</th>
						<th scope="col">First Approver</th>
						<th scope="col">Second Approver</th>
						<th scope="col">Third Approver</th>
					</tr>
					</thead>
					<tbody>
						{renderRequests}
					</tbody>
				</table>
			</div>
			</React.Fragment>);
	}

	renderAssignModal = (request) => {
		if(request.status3 === "PENDING") return null;
		return (
			<Modal show={this.state.showAssignModal} onHide={() => this.onAssignCompleted()}>
				<Modal.Header closeButton>
					<Modal.Title>Assign next approver</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AssignApprover onAssignCompleted={() => this.onAssignCompleted()} request={request}></AssignApprover>
				</Modal.Body>
			</Modal>
		);
	};

	renderCreateModal = () => {
		return (
			<Modal show={this.state.showCreateModal} onHide={() => this.onCreateCompleted()}>
				<Modal.Header closeButton>
					<Modal.Title>Assign approver</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreateRequest onCreateCompleted={() => this.onCreateCompleted()} requesterId={this.props.userId}></CreateRequest>
				</Modal.Body>
			</Modal>
		);
	};

	renderCreateButton = () => {
		return( this.state.roles ? (
			this.state.roles.indexOf("REQUESTER_0") >= 0 ?
					<input type="submit" className="float-right" value="Create Request" onClick={this.onSubmitCreate.bind(this)}/>
				: null ) : null
		);
	}
}


export default RequestsPage;