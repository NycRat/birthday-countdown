import React, { Component, Fragment } from "react";
import { Badge, Container } from "react-bootstrap";
import { Birthday } from "../app";
import { getFormattedDate } from "../helperFunctions";

class CurrentBirthday extends Component<{ curBirthdays: Birthday[] }> {
  state = {};
  render() {
    let names = "";
    for (let i = 0; i < this.props.curBirthdays.length; i++) {
      names += this.props.curBirthdays[i].firstName;
      names += " ";
      names += this.props.curBirthdays[i].lastName;
      if (i !== this.props.curBirthdays.length - 1) {
        names += ", ";
      }
      if (i === this.props.curBirthdays.length - 2) {
        names += "and ";
      }
    }
    return (
      <Fragment>
        <Container
          style={{
            textAlign: "center",
          }}
        >
          <h1>
            <Badge
              bg="primary"
              pill={true}
              className="m-2 text-wrap"
              style={{
                fontSize: "calc(20px + 1.5vw)",
              }}
            >
              {getFormattedDate(new Date())}
            </Badge>
            <br></br>
            <Badge
              bg="success"
              pill={true}
              className="m-2 text-wrap"
              style={{
                fontSize: "calc(20px + 2.5vw)",
              }}
            >
              It's {names}'s Birthday!
            </Badge>
          </h1>
        </Container>
      </Fragment>
    );
  }
}

export default CurrentBirthday;
