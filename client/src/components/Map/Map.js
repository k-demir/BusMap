import React, { Component } from 'react';
import L from "leaflet";
import "./Map.css";

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      busMarkers: []
    };
  }

  componentDidMount() {
    this.addMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.busData !== this.props.busData || prevProps.unselected !== this.props.unselected) {
      this.addBuses();
    }
  }

  addMap() {
    this.map = L.map("map", {
      center: [60.4520, 22.2650],
      zoom: 14,
      layers: [
        L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png", {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
      ]
    });
  }

  addBuses() {
    let busMarkers = [];

    for (let busKey in this.props.busData) {
      let bus = this.props.busData[busKey];

      if (!this.props.unselected.includes(bus.busNum)) {
        let busIcon = L.divIcon({
          className: "busIcon",
          html: "<span class='busIconSpan'>" + bus.busNum + "</span>",
          iconSize: [20, 14]
        })

        busMarkers.push(L.marker([bus.lat, bus.lon], {
          icon: busIcon,
          keyboard: false,
          riseOnHover: true
        }));
      }
    }

    for (let marker of this.state.busMarkers) {
      this.map.removeLayer(marker);
    }

    this.setState({busMarkers: busMarkers}, () => {
      for (let marker of this.state.busMarkers) {
        marker.addTo(this.map)
      }
    })
  }



  render() {
    return (
      <div className="Map" id="map" />
    )
  }
}


export default Map;
