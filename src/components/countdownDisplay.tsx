import { Component, Fragment } from "react";
import { Badge } from "react-bootstrap";
import { Birthday } from "../app";
import { getFormattedDate } from "../helperFunctions";
import { timeBetween } from "../helperFunctions";

class CountdownDisplay extends Component<{ birthdays: Birthday[] }> {
  _isMounted = false;

  state = {
    formattedTime: "",
    formattedDate: "",
    upcomingBirthdays: [this.props.birthdays[0]],
  };

  componentDidMount() {
    setInterval(() => this.update(), 10);
    this.getUpcomingBirthdays();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  update = () => {
    if (this._isMounted) {
      let nearestBirthday = this.state.upcomingBirthdays[0];
      let year = nearestBirthday.getFullYear();
      nearestBirthday.setFullYear(new Date().getFullYear());
      this.setState({ formattedTime: this.getTimeBefore(nearestBirthday) });
      this.setState({ formattedDate: getFormattedDate(nearestBirthday) });
      nearestBirthday.setFullYear(year);
    }
  };

  render() {
    const upcomingBirthdays = this.state.upcomingBirthdays;
    let names = "";
    for (let i = 0; i < upcomingBirthdays.length; i++) {
      names += upcomingBirthdays[i].firstName;
      names += " ";
      names += upcomingBirthdays[i].lastName;
      if (i !== upcomingBirthdays.length - 1) {
        names += ", ";
      }
      if (i === upcomingBirthdays.length - 2) {
        names += "and ";
      }
    }
    return (
      <Fragment>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            <Badge bg="secondary" pill={true} className="m-2 text-wrap">
              {names}
            </Badge>
            <br />
            <Badge bg="primary" pill={true} className="text-wrap mb-3">
              {this.state.formattedDate}
            </Badge>
            <br></br>
            <Badge
              bg="success"
              className="text-wrap"
              style={{
                fontSize: "calc(18px + 2.5vw)",
              }}
            >
              {this.state.formattedTime}
            </Badge>
          </h1>
        </div>
      </Fragment>
    );
  }

  getUpcomingBirthdays = () => {
    let birthdays = this.props.birthdays;
    let upcomingBirthdays = [birthdays[0]];
    let oriYear = birthdays[0].getFullYear();

    let today = new Date();

    upcomingBirthdays[0].setFullYear(today.getFullYear());
    if (upcomingBirthdays[0].getTime() - today.getTime() < 0) {
      upcomingBirthdays[0].setFullYear(today.getFullYear() + 1);
    }
    let diffB = timeBetween(upcomingBirthdays[0], today, 1);

    for (let i = 1; i < birthdays.length; i++) {
      let yearA = birthdays[i].getFullYear();
      birthdays[i].setFullYear(today.getFullYear());

      if (birthdays[i].getTime() - today.getTime() < 0) {
        birthdays[i].setFullYear(today.getFullYear() + 1);
      }

      let diffA = timeBetween(birthdays[i], today, 1);

      if (diffA < diffB) {
        upcomingBirthdays = [];
        upcomingBirthdays.push(birthdays[i]);
        diffB = timeBetween(upcomingBirthdays[0], today, 1);
      } else if (diffA === diffB) {
        upcomingBirthdays.push(birthdays[i]);
      }

      birthdays[i].setFullYear(yearA);
    }

    birthdays[0].setFullYear(oriYear);

    this.setState({ upcomingBirthdays });
  };

  getTimeBefore = (date: Date) => {
    const now = new Date();
    const days = Math.floor(timeBetween(date, now, 1000 * 60 * 60 * 24));
    const hours = Math.floor(timeBetween(date, now, 1000 * 60 * 60)) % 24;
    const minutes = Math.floor(timeBetween(date, now, 1000 * 60)) % 60;
    const seconds = Math.floor(timeBetween(date, now, 1000)) % 60;
    let formattedTime =
      days +
      " days, " +
      hours +
      " hours, " +
      minutes +
      " minutes, " +
      seconds +
      " seconds.";
    // formattedTime += 'days: ' + days ;
    return formattedTime;
  };
}

export default CountdownDisplay;
