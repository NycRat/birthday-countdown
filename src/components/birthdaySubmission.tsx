import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Birthday, SERVER_HTTP } from "../app";

class BirthdaySubmission extends Component<{
  birthdays: Array<Birthday>;
  refreshList: () => void;
}> {
  state = {
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
  };

  render() {
    return (
      <Fragment>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            // maxWidth: '100%'
          }}
        >
          <h1
            className="m-4"
            style={{
              fontSize: "40px",
            }}
          >
            Birthday Submission
          </h1>
          <Container
            style={{
              width: "80vw",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="First Name"
                aria-label="First Name"
                aria-describedby="basic-addon1"
                onChange={(event) => {
                  this.setState({ firstName: event.target.value });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Last Name"
                aria-label="Last Name"
                aria-describedby="basic-addon1"
                onChange={(event) => {
                  this.setState({ lastName: event.target.value });
                }}
              />
            </InputGroup>

            <Form.Label htmlFor="basic-url">Your Birthday</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Day"
                aria-label="Day"
                aria-describedby="basic-addon3"
                onChange={(event) => {
                  this.setState({ day: event.target.value });
                }}
              />
              <FormControl
                placeholder="Month"
                aria-label="Month"
                aria-describedby="basic-addon3"
                onChange={(event) => {
                  this.setState({ month: event.target.value });
                }}
              />
              <FormControl
                placeholder="Year"
                aria-label="Year"
                aria-describedby="basic-addon3"
                onChange={(event) => {
                  this.setState({ year: event.target.value });
                }}
              />
            </InputGroup>
          </Container>
          <Button
            variant="primary"
            onClick={this.handleSubmit}
            style={{
              fontSize: "40px",
              fontWeight: "bolder",
            }}
            id="submitButton"
          >
            Submit
          </Button>
        </Container>
      </Fragment>
    );
  }

  handleSubmit = () => {
    let { firstName, lastName, day, month, year } = this.state;
    if (
      new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      ).toString() === "Invalid Date"
    ) {
      if (
        new Date(Date.parse(month + " " + day + ", " + year)).toString() ===
        "Invalid Date"
      ) {
        console.log("invalid date");
        return;
      } else {
        // change month from name to index
        month = (
          new Date(Date.parse(month + " 1, 1920")).getMonth() + 1
        ).toString();
      }
    }

    if (firstName.length === 0) {
      console.log("invalid firstname");
      return;
    }
    if (lastName.length === 0) {
      console.log("invalid lastname");
      return;
    }

    // actually submit it
    fetch(
      SERVER_HTTP +
        "/add." +
        firstName +
        "." +
        lastName +
        "." +
        day +
        "." +
        month +
        "." +
        year
    ).then(() => {
      this.props.refreshList();
    });

    let submitButton = document.getElementById("submitButton");
    if (submitButton !== null) {
      (submitButton as HTMLButtonElement).disabled = true;
    }
  };

  // addBirthday(birthday: Birthday) {
  //   let birthdays = this.state.birthdays;
  //   birthdays.push(birthday);
  //   this.setState({ birthdays });
  // }
}

export default BirthdaySubmission;
