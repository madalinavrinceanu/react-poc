import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import Logout from "../Logout/Logout";

const HorizontalNavbar = (props) => {

    const roles = props.roles ? props.roles.toString() : null;

    return (
        <Navbar bg="light" variant="light">

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav></Nav>
            </Navbar.Collapse>
            <span style={{paddingRight : "20px"}}>
                <p>{props.user}</p>
                <p className="user-roles">{roles}</p>
            </span>
            <Logout></Logout>
        </Navbar>
    );
};

export default HorizontalNavbar;
