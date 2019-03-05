import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map/Map";
import Selector from "./components/Selector/Selector";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      busData: [],
      unselected: [],
      uniqueBusNumbers: []
    };
    this.apiUrl = "/api/buses";
  }

  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => this.getData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData() {
    fetch(this.apiUrl, {
      method: "GET",
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(res => {
      this.setState({busData: res}, () => {
        let uniqueBusNumbers = [];

        for (let busKey in this.state.busData) {
          if (!uniqueBusNumbers.includes(this.state.busData[busKey].busNum)) {
            uniqueBusNumbers.push(this.state.busData[busKey].busNum);
          }
        }

        this.setState({uniqueBusNumbers: uniqueBusNumbers});
      })
    });
  }

  toggleSelected = (busNum) => {
    if (!this.state.unselected.includes(busNum))
      this.setState((prev) => ({unselected: [...prev.unselected, busNum]}));
    else
      this.setState({unselected: this.state.unselected.filter((b) => b !== busNum)})
  }

  unselectAll = () => {
    this.setState({unselected: this.state.uniqueBusNumbers});
  }

  selectAll = () => {
    this.setState({unselected: []});
  }

  render() {
    return (
      <div className="App">
        <Selector
          busData={this.state.busData}
          unselected={this.state.unselected}
          uniqueBusNumbers={this.state.uniqueBusNumbers}
          toggleSelected={this.toggleSelected}
          selectAll={this.selectAll}
          unselectAll={this.unselectAll}
        />
        <Map
          busData={this.state.busData}
          unselected={this.state.unselected}
        />
      </div>
    );
  }
}

export default App;
