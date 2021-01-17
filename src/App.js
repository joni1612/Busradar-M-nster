import React, { Component } from "react";
import BusMap from "./components/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataHandling from './components/DataHandling';


class Apps extends Component {
  constructor(props) {
    super(props);
    this.interval = 0;
    this.datahandling = new DataHandling;
    this.state = {
      items: [],
      isLoaded: false,
      currentCount: 0,
      filteredBusses: [],
      AllBusses: [],
      filter: [],
      AllLines: [],
      itemsBus: [],
      itmesStop: [],
      isLoadedBus: false,
      isLoadedStops: false,
      zoom: 16,
      currensposition: [],
      positionLoaded: false,
    };
    this.filterBusses = this.filterBusses.bind(this);
    this.getData = this.getData.bind(this);

  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount + 1
    })
    if (this.state.currentCount >= 10) {
      this.getData();
      this.setState({
        currentCount: 0
      });
    }
  }

  filterBusses(id) {
    const newStateArray = this.state.filter.slice();
    const index = newStateArray.indexOf(id);

    if (index > -1) {
      newStateArray.splice(index, 1);
    }
    else {
      newStateArray.push(id);
    }

    this.setState({
      filter: newStateArray,
    },
      this.updateFilteredBusses);
  }

  updateFilteredBusses() {

    this.setState({
      filteredBusses: this.datahandling.getBusInformation(this.state.items, this.state.filter, this.state.busStops),
    });
  }

  componentDidMount() {
    this.getHaltestellen();
    setInterval(this.timer.bind(this), 1000);
  }

  getHaltestellen() {
    fetch("https://rest.busradar.conterra.de/prod/haltestellen")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          busStops: this.datahandling.getBusStops(json.features),
          itemsStop: json.features,
        });
      }).then(() => this.getData())
      ;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((success) =>
          this.setState({
            currensposition: [success.coords.latitude, success.coords.longitude],
            positionLoaded: true,
          })
        );

      } else {
        console.log("Not Available");
      }
  }


  getData() {
    fetch("https://rest.busradar.conterra.de/prod/fahrzeuge")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json.features,
          AllLines: this.datahandling.getBusLines(json.features, this.state.filter),
          AllBusses: this.datahandling.getBusInformation(json.features, [],  this.state.busStops),
          filteredBusses: this.datahandling.getBusInformation(json.features, this.state.filter, this.state.busStops),
          isLoaded: true,
          itemsBus: json.features,
        });
      });
  }

  render() {
    if (this.state.isLoaded) {
    return (
      <div>
        <BusMap
          itemsStop={this.state.itemsStop}
          itemsBus={this.state.itemsBus}
          zoom={this.state.zoom}
          currentPosition={this.state.currensposition}
          positionLoaded={this.state.positionLoaded}
          busStops={this.state.busStops}
          AllLines={this.state.AllLines}
          filter={this.state.filter}
          filterBusses={this.filterBusses}
          AllBusses={this.state.AllBusses}
          items={this.state.items}
          filteredBusses={this.state.filteredBusses} />
      </div>
      
    );
  }
  else {
    return <p>Is Loading...</p>
  }
  }
}

export default Apps;
