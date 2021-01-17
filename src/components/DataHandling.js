import { v4 as uuidv4 } from 'uuid';

export default class DataHandling {
  constructor() {
  }
  

  getBusStops (data) {
    const haltestellen =  {};
    data?.forEach((item) => {
      haltestellen[item.properties.nr] = item.properties.lbez;
    })
    return haltestellen;
  }
  
  getBusLines(data, filter) {
    const linesArray = [];
    const lines = [];
    let bus;
    data?.forEach((item) => {
      if (!lines.includes(item.properties.linienid)){
        if(!filter.includes(item.properties.linienid)){
          bus = {
            linienid: item.properties.linienid,
            id: uuidv4(),
          }  
        } else {
          bus = {
            linienid: item.properties.linienid,
            id: uuidv4(),
            checked: true,
          }  
        }
        linesArray.push(bus);
        lines.push(item.properties.linienid);
      }
    });
    linesArray.sort((a, b) => {
      return a.linienid - b.linienid
    });

    return linesArray;
  }

  getBusInformation(data, filter, haltestellen) {
    const busArray = [];
    let bus;
    if (filter.length > 0) {
      data?.forEach((item) => {
        filter.forEach(filterItem => {
          if (filterItem === item.properties.linienid) {
            bus = item.properties;
            bus['longitude'] = item.geometry.coordinates[0];
            bus['latitude'] = item.geometry.coordinates[1];
            bus['id'] = uuidv4();
            bus['Starthaltestelle'] = haltestellen[item.properties.starthst];
            bus['Zielhaltestelle'] = haltestellen[item.properties.zielhst];
            busArray.push(bus);
          }
        })
      });
      busArray.sort((a, b) => {
        return a.linienid - b.linienid
      });



      return busArray;
    }
    data?.map((item) => {
      bus = item.properties;
      bus['longitude'] = item.geometry.coordinates[0];
      bus['latitude'] = item.geometry.coordinates[1];
      bus['id'] = uuidv4();
      bus['Starthaltestelle'] = haltestellen[item.properties.starthst];
      bus['Zielhaltestelle'] = haltestellen[item.properties.zielhst];
      bus['Aktuellhaltestelle'] = haltestellen[item.properties.akthst];

      busArray.push(bus);
    });
    busArray.sort((a, b) => {
      return a.linienid - b.linienid
    });

    return busArray;
  }

}

