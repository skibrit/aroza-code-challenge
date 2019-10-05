import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import "./navbar.scss";

const NavBar = ({ history }) => {
  const [isOpen, toggleMenu] = useState(false);

  const toggle = () => {
    toggleMenu(prevState => !prevState);
  };

  const navigate = (e, href) => {
    e.preventDefault();
    history.push(href);
  };

  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="navbar navbar-expand-lg navbar-dark nav-fill bg-dark"
      id="mainNav"
    >
      <NavbarBrand
        href="#"
        className="navbar-brand"
        onClick={e => navigate(e, "/")}
      >
        {" "}<img
          className="nav-logo"
          src={require("../../../assets/images/logo.png")}
          alt="logo"
        />
        CountryWiki
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={e => navigate(e, "/")}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={e => navigate(e, "/countries")}>
              Countries
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
