import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

class NavBar extends Component {
  state = {};

  logo = require("../favicon.png");

  render() {
    return (
      <Navbar bg="info" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand
            href="/birthday-countdown/#"
            style={{
              fontWeight: "bold",
              fontSize: "125%",
            }}
          >
            <img
              src={this.logo}
              alt="icon"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Birthday Countdown
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/birthday-countdown/#/countdown">
                Countdown
              </Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link href="/birthday-countdown/#/birthday-submission"> */}
              {/*   Add your birthday */}
              {/* </Nav.Link> */}
              <Nav.Link href="/birthday-countdown/#/list">
                Birthdays List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
