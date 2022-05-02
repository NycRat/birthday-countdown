import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class SortOptions extends Component<{
  sortUpcoming: () => void;
  sortAge: () => void;
  sortDate: () => void;
  reverseList: () => void;
}> {
  state = {
    ascending: true,
    sortOption: "Sorted by Upcoming",
    sortFunction: () => {},
  };

  componentWillUnmount = () => {
    this.props.sortUpcoming();
  };

  render() {
    return (
      <DropdownButton
        variant="secondary"
        title={
          this.state.sortOption +
          " " +
          (this.state.ascending ? " (Ascending)" : " (Descending)")
        }
        id="input-group-dropdown-1"
        className="m-2"
      >
        <Dropdown.Item
          onClick={() => {
            this.sort(this.props.sortAge);
            this.setState({ sortOption: "Sorted by Age" });
          }}
        >
          Sort by Age {this.getSelected("Age")}
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            this.sort(this.props.sortUpcoming);
            this.setState({ sortOption: "Sorted by Upcoming" });
          }}
        >
          Sort by Upcoming {this.getSelected("Upc")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            this.sort(this.props.sortDate);
            this.setState({ sortOption: "Sorted by Date" });
          }}
        >
          Sort by Date {this.getSelected("Dat")}
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          onClick={() => {
            if (!this.state.ascending) {
              // this.state.sortFunction();
              this.props.reverseList();
              this.setState({ ascending: true });
            }
          }}
        >
          Ascending {this.state.ascending ? "✓" : ""}
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            if (this.state.ascending) {
              // this.state.sortFunction();
              this.props.reverseList();
              this.setState({ ascending: false });
            }
          }}
        >
          Descending {this.state.ascending ? "" : "✓"}
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  getSelected = (word: string) => {
    return this.state.sortOption.substring(10, 13) === word ? "✓" : "";
  };

  sort = (sortFunc: () => void) => {
    sortFunc();
    this.setState({ sortFunction: sortFunc });
    if (!this.state.ascending) {
      this.props.reverseList();
    }
  };
}

export default SortOptions;
