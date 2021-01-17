import React, { Component } from "react";
import DataTable from 'react-data-table-component';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

const columns = [
  {
    name: 'Linienid',
    selector: 'linienid',
    sortable: true,
  },
  {
    name: 'Richtungstext',
    selector: 'richtungstext',
    sortable: true,
  },
  {
    name: 'Starthaltestelle',
    selector: 'Starthaltestelle',
    sortable: true,
  },
  {
    name: 'Zielhaltestelle',
    selector: 'Zielhaltestelle',
    sortable: true,
  },
  {
    name: 'Aktuelle Haltestelle',
    selector: 'Aktuellhaltestelle',
    sortable: true,
  },
  {
    name: 'Verspätung',
    selector: 'delay',
    sortable: true,
  },
];

class BusDialogV2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      filter: []
    };
  }

  render() {
      return (
        <div className="Filter">
          <DropdownButton id="dropdown-item-button" title="Busfilter">
            <Form>
              {this.props.AllLines.map((bus) => (
                <div key={`${bus.id}`} className="mb-3">
                  <Form.Check
                    type={"checkbox"}
                    id={`${bus.id}`}
                    label={`Linie ${bus?.linienid}`}
                    checked={(!this.props.filter.includes(bus?.linienid)) ? false : true}
                    onChange={(e) => {
                        this.handleFilter(bus.linienid)
                    }}
                  />
                </div>
              ))}
            </Form>
          </DropdownButton>
          <DataTable
            title="Busse"
            columns={columns}
            data={this.props.filter?.length >= 0 ? this.props.filteredBusses : this.props.AllBusses}
            pagination
            highlightOnHover
          />
        </div>)

  }

  handleFilter(fahrzeugid) {
    this.props.filterBusses(fahrzeugid);
  }
}


export default BusDialogV2;
