import React, { Component } from 'react';
import "./Selector.css";

class Selector extends Component {

  render() {
    let buttons = [];

    let busNums = this.props.uniqueBusNumbers.sort(function(a, b) {
      return a.match(/(\d)+/g)-b.match(/(\d)+/g);
    });

    for (let bus of busNums) {
      buttons.push(
        <button
          className={"busButton" + (this.props.unselected.includes(bus) ? "" : " selected")}
          onClick={() => this.props.toggleSelected(bus)}
          key={"bus-" + bus}
        >
          {bus}
        </button>
      )
    }

    return (
      <div className="Selector">
      <button
        className={"busButton" + (this.props.unselected.length > 0 ? " selected" : "")}
        onClick={() => this.props.selectAll()}
      >
        Select all
      </button>
      <button
        className={"busButton" + (this.props.uniqueBusNumbers.length - this.props.unselected.length > 0 ? " selected" : "")}
        onClick={() => this.props.unselectAll()}
      >
        Unselect all
      </button>
        {buttons}
      </div>
    );
  }
}

export default Selector;
