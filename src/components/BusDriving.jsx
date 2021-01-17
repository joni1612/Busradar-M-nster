import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
// import { busIconRed, busIconGreen, busIconYellow } from "../icon";
import { busIcon } from "../icon";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
// import ExtraMarkers from "leaflet-extra-markers";

class BusDriving extends Component {
  render() {
    return this.loadComponent();
  }

  loadComponent() {
    return this.props.itemsBus.map(((item) => {
      if (
        this.props.filter.length > 0
          ? this.props.filter.includes(item.properties.linienid)
          : true
      ) {
        return (
          <div key={uuidv4()}>
            <Marker
              icon={
                // item.properties.delay > 20
                //   ? busIconRed
                //   : item.properties.delay >= 10
                //   ? busIconYellow
                //   : busIconGreen
                busIcon
              }
              position={[
                item.geometry.coordinates[1],
                item.geometry.coordinates[0],
              ]}
              opacity="1"
              size="30px"
            >
              <Popup>
                Linie: {item.properties.linienid} <br /> Richtung:{" "}
                {item.properties.richtungstext}
              </Popup>
            </Marker>
            <Marker
              // icon={
              //   new L.ExtraMarkers.icon({
              //     shape: "",
              //     innerHTML: item.properties.linienid.toString(),
              //     color: "red",
              //     iconColor: "red",
              //     iconSize: [24, 24],
              //     iconAnchor: [2, 0],
              //   })
              // }
              icon = {L.divIcon({className: 'my-div-icon',
              html:item.properties.linienid.toString(),
              iconAnchor: [2, 0],
             })}
              position={[
                item.geometry.coordinates[1],
                item.geometry.coordinates[0],
              ]}
            >
              <Popup>
                Linie: {item.properties.linienid} <br /> Richtung:{" "}
                {item.properties.richtungstext}
              </Popup>
            </Marker>
          </div>
        );
      }
    }));
  }
}
export default BusDriving;
