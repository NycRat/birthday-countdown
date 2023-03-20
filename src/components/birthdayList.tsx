import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { Birthday } from "../app";
import { getFormattedDate } from "../helperFunctions";
import SortOptions from "./sortOptions";

class BirthdayList extends Component<{
  birthdays: Birthday[];
  sortUpcoming: () => void;
  sortAge: () => void;
  sortDate: () => void;
  reverseList: () => void;
}> {
  state = {};

  render() {
    let i = 0;
    return (
      <Container
        style={{
          width: "50vw",
          minWidth: "450px",
        }}
      >
        <SortOptions
          sortUpcoming={this.props.sortUpcoming}
          sortAge={this.props.sortAge}
          sortDate={this.props.sortDate}
          reverseList={this.props.reverseList}
        />
        <ListGroup as="ol" numbered style={{
          maxHeight: "85vh",
          overflow: "auto"
        }}>
          {this.props.birthdays.map((birthday) => (
            <ListGroupItem as="li" variant="light" key={i++}>
              {birthday.firstName} {birthday.lastName}:{" "}
              {getFormattedDate(birthday)}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default BirthdayList;
