import React from 'react';
import { withRouter } from "react-router";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import LogoutActions from "../../actions/LogoutActions";
import LogoutStore from "../../stores/LogoutStore";
import WithStoreSubscription from "../Common/hocs/WithStoreSubscriptions";

@WithStoreSubscription([LogoutStore])
class Logout extends React.Component {


    constructor() {
        super();
        this.state = {

        };
    }

    onSubmit() {
        event.preventDefault();
        LogoutActions.logout();
        this.props.history.push("/login");
    }

    render() {
        return <a href="" className="float-right pr-3"><FontAwesomeIcon style={{color:"blue"}} icon={faSignOutAlt}  onClick={() => this.onSubmit()}/></a>;
    }
}

export default withRouter(Logout);