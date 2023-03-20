import React, { Component, Fragment } from "react";
import NavBar from "./components/navBar";
import CountdownDisplay from "./components/countdownDisplay";
import BirthdayList from "./components/birthdayList";
import { HashRouter, Route, Routes } from "react-router-dom";
import { timeBetween } from "./helperFunctions";
/* import BirthdaySubmission from "./components/birthdaySubmission"; */
import CurrentBirthday from "./components/currentBirthday";
import birthdaysList from "./something.json";

export class Birthday extends Date {
  firstName: string;
  lastName: string;
  constructor(
    year: number,
    month: number,
    day: number,
    firstName: string,
    lastName: string
  ) {
    super(year, month, day);
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// i am just not hosting this.
/* export const SERVER_HTTP = "https://birthday-db.herokuapp.com"; */

class App extends Component {
  state: { birthdays: Array<Birthday> } = {
    birthdays: [],
  };

  componentDidMount() {
    this.updateBirthdays();
  }

  render() {
    return (
      <Fragment>
        <NavBar />

        {this.getPage()}
      </Fragment>
    );
  }

  getPage = () => {
    if (this.state.birthdays.length <= 1) {
      return <h1 className="text-center">Loading...</h1>;
    }
    return (
      <HashRouter>
        <Routes>
          <Route
            path="/countdown"
            element={<CountdownDisplay birthdays={this.state.birthdays} />}
          ></Route>
          <Route
            path="/list"
            element={
              <BirthdayList
                birthdays={this.state.birthdays}
                sortUpcoming={this.sortUpcoming}
                sortAge={this.sortAge}
                sortDate={this.sortDate}
                reverseList={this.reverseBirthdayList}
              />
            }
          ></Route>
          {/* <Route */}
          {/*   path="/birthday-submission" */}
          {/*   element={ */}
          {/*     <BirthdaySubmission */}
          {/*       birthdays={this.state.birthdays} */}
          {/*       refreshList={this.updateBirthdays} */}
          {/*     /> */}
          {/*   } */}
          {/* ></Route> */}
          <Route path="/" element={this.getMainPage()}></Route>
          <Route
            path="*"
            element={<h1 className="m-2">404 page not found</h1>}
          ></Route>
        </Routes>
      </HashRouter>
    );
  };

  getMainPage = () => {
    let birthdays = this.state.birthdays;
    let today = new Date();

    let curBirthdays: Array<Birthday> = [];
    for (let i = birthdays.length - 1; i > 0; i--) {
      if (
        birthdays[i].getMonth() === today.getMonth() &&
        birthdays[i].getDate() === today.getDate()
      ) {
        curBirthdays.push(birthdays[i]);
      }
    }
    if (curBirthdays.length > 0) {
      return <CurrentBirthday curBirthdays={curBirthdays} />;
    }
    return <CountdownDisplay birthdays={birthdays} />;
  };

  updateBirthdays = () => {
    let birthdays: Array<Birthday> = [];
    this.setState({ birthdays });

    for (let bd of birthdaysList) {
      birthdays.push(
        new Birthday(bd.year, bd.month - 1, bd.day, bd.firstName, bd.lastName)
      );
    }

    console.log(birthdays);

    this.cn(birthdays);
  };

  sortAge = () => {
    let birthdays = this.state.birthdays;
    birthdays.sort((a, b) => {
      return b.getTime() - a.getTime();
    });
    this.setState({ birthdays });
  };

  sortDate = () => {
    let birthdays = this.state.birthdays;
    birthdays.sort((a, b) => {
      const start = new Date();
      let aYear = a.getFullYear();
      let bYear = b.getFullYear();

      a.setFullYear(start.getFullYear());
      b.setFullYear(start.getFullYear());

      let diff = a.getTime() - b.getTime();

      a.setFullYear(aYear);
      b.setFullYear(bYear);
      return diff;
    });
    this.setState({ birthdays });
  };

  cn = (birthdays: Array<Birthday>) => {
    birthdays.sort((a, b) => {
      const now = new Date();
      let aYear = a.getFullYear();
      let bYear = b.getFullYear();

      a.setFullYear(now.getFullYear());
      b.setFullYear(now.getFullYear());
      if (a.getTime() - now.getTime() < 0) {
        a.setFullYear(a.getFullYear() + 1);
      }
      if (b.getTime() - now.getTime() < 0) {
        b.setFullYear(b.getFullYear() + 1);
      }

      let aDis = Math.floor(timeBetween(a, now, 1000 * 60 * 60 * 24));
      let bDis = Math.floor(timeBetween(b, now, 1000 * 60 * 60 * 24));

      a.setFullYear(aYear);
      b.setFullYear(bYear);
      return aDis - bDis;
    });

    this.setState({ birthdays });
  }

  sortUpcoming = () => {
    let birthdays = this.state.birthdays;

    birthdays.sort((a, b) => {
      const now = new Date();
      let aYear = a.getFullYear();
      let bYear = b.getFullYear();

      a.setFullYear(now.getFullYear());
      b.setFullYear(now.getFullYear());
      if (a.getTime() - now.getTime() < 0) {
        a.setFullYear(a.getFullYear() + 1);
      }
      if (b.getTime() - now.getTime() < 0) {
        b.setFullYear(b.getFullYear() + 1);
      }

      let aDis = Math.floor(timeBetween(a, now, 1000 * 60 * 60 * 24));
      let bDis = Math.floor(timeBetween(b, now, 1000 * 60 * 60 * 24));

      a.setFullYear(aYear);
      b.setFullYear(bYear);
      return aDis - bDis;
    });

    this.setState({ birthdays });
  };

  reverseBirthdayList = () => {
    let birthdays = this.state.birthdays;
    birthdays.reverse();
    this.setState({ birthdays });
  };
}

export default App;
