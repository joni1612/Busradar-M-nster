import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";

import { busStopIcon } from "../icon";
import { v4 as uuidv4 } from "uuid";

class BusStops extends Component {
  render() {
    if (!this.props.isLoadedStops) {
      return "ok";
    } else {
      return this.props.itemsStop.map((item) => {
        return (
          <Marker
            icon={busStopIcon}
            key={uuidv4()}
            position={[
              item.geometry.coordinates[1],
              item.geometry.coordinates[0],
            ]}
          >
            <Popup>
              Haltestelle: {item.properties.lbez} <br /> Richtung:{" "}
              {item.properties.richtung}
            </Popup>
          </Marker>
        );
      });
    }
  }
}

export default BusStops;
