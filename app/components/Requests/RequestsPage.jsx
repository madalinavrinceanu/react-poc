import React from 'react';
import {Modal} from "react-bootstrap";
import _ from "lodash";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';

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
			requests: {currentPage: [], totalCount: null},
			activePage: 1,
			pageSize: 5,
			currentRequest: {},
			statistics: {}
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
		if(store.userId && this.state.requests.currentPage && this.state.requests.currentPage.length === 0) {
			RequestsActions.fetchRequests.defer(store.userId, this.state.activePage, this.state.pageSize);
			RequestsActions.fetchStatistics.defer();
		}
	};

	onSubmitAssign(request, number) {
		event.preventDefault();
		this.setState({showAssignModal:true, currentRequest: request});

		//the task was already started, no need to start again.
		if(request.taskStatus !== "InProgress") {
			RequestsActions.startTaskRequest(request.taskId);
			request.taskStatus = "InProgress";
		}

		if(number === 3) {
			RequestsActions.completeRequest(
				request.taskId,
				this.state.userId,
				{
					thirdApprover: this.state.userId,
					status3: "APPROVED"
				}
			);
		}
	}

	onDecline(request, level) {
		event.preventDefault();
		if(request.taskStatus !== "InProgress") {
			RequestsActions.startTaskRequest(request.taskId);
		}
		RequestsActions.declineRequest(request.taskId, this.state.userId, {["status" + level] : "DECLINED"});
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

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});
		RequestsActions.fetchRequests.defer(this.state.userId, pageNumber, this.state.pageSize);
	}
	render() {

		const displayStatus = (status) => {
			if(status === "APPROVED") {
				return <span style={{color: "#298A08", fontSize: "smaller"}}>APPROVED</span>;
			}
			if(status === "DECLINED") {
				return <span style={{color: "#FF0000", fontSize: "smaller"}}>DECLINED</span>;
			}
			if(status === "PENDING") {
				return <span style={{color: "#2E9AFE", fontSize: "smaller"}}>PENDING</span>;
			}
			return null;
		};

		const renderStatus = (request, number) => request["approver" + number] === this.state.userId ? (request["status" + number] === "PENDING" ?
	        <span>
		        <a href=""><FontAwesomeIcon style={{color:"green", fontSize: "x-large", marginRight: "20px"}} icon={faCheck}  onClick={() => this.onSubmitAssign(request, number)}/></a>
		        <a href=""><FontAwesomeIcon style={{color:"red", fontSize: "x-large", marginRight: "20px"}} icon={faTimes} onClick={() => this.onDecline(request, number)}/></a>
	        </span>

	        : displayStatus(request["status" + number])) : displayStatus(request["status" + number]);

		const renderRequests = _.map(this.state.requests.currentPage, request => {
            return (
	            <React.Fragment>
		            <tr key={request.processInstanceId}>
			            <td className="align-middle" scope="row">{request.processInstanceId}</td>
			            <td className="align-middle">{request.date || '-'}</td>
			            <td className="align-middle">{request.requesterName}</td>
			            <td className="align-middle">
				            <p>{request.approver1Name || '-'}</p>
				            <p style={{paddingTop: "5px"}}>{renderStatus(request, 1) || '-'}</p>
			            </td>
			            <td className="align-middle">
				            <p>{request.approver2Name || '-'}</p>
				            <p style={{paddingTop: "5px"}}>{renderStatus(request, 2) || '-'}</p>
			            </td>
			            <td className="align-middle">
				            <p>{request.approver3Name || '-'}</p>
				            <p style={{paddingTop: "5px"}}>{renderStatus(request, 3) || '-'}</p>
			            </td>
		            </tr>
	            </React.Fragment>
            );
        });

		const renderStatistics = () => {
			if(this.state.statistics.approvedRequests !== null) {
				return <p className="float-left">
					<span className="pr-5" style={{color: "#298A08"}}>{this.state.statistics.approvedRequests} Approved Request(s)</span>
					<span className="pr-5" style={{color: "#2E9AFE"}}>{this.state.statistics.pendingRequests} Pending Request(s)</span>
					<span className="pr-5" style={{color: "#FF0000"}}>{this.state.statistics.declinedRequests} Declined Request(s)</span>
				</p>;
			}
		};

		return (<React.Fragment>

			<h1 className="pt-5 space-between">Requests {this.renderCreateButton()}</h1>

			{renderStatistics()}
			{this.renderCreateModal()}
			<div className="standard-container">
				<table className="table table-striped" style={{textAlign: "center"}}>
					<thead className="table-header">
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
				<div className="float-right">
					<Pagination
						activePage={this.state.activePage}
						itemsCountPerPage={this.state.pageSize}
						totalItemsCount={this.state.requests.totalCount}
						onChange={this.handlePageChange.bind(this)}
					/>
				</div>
			</div>
			{this.renderAssignModal(this.state.currentRequest)}
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
					<CreateRequest onCreateCompleted={() => this.onCreateCompleted()} requesterId={this.state.userId}></CreateRequest>
				</Modal.Body>
			</Modal>
		);
	};

	renderCreateButton = () => {
		return( this.state.roles ? (
			this.state.roles.indexOf("REQUESTER_0") >= 0 ?
					<input type="submit" style={{backgroundColor: "#2E9AFE", padding:"15px 50px"}} value="Create Request" onClick={this.onSubmitCreate.bind(this)}/>
				: null ) : null
		);
	}
}


export default RequestsPage;