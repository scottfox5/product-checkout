import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const stateAbrevs = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']

function validate(name, street, city, state, zip) {

  const errors = [];

  if (name.length === 0) {
    errors.push("Name is required");
  }
  if (street.length === 0) {
    errors.push("Street is required");
  }
  if (city.length === 0) {
    errors.push("City is required");
  }
  if (state.length === 0) {
    errors.push("State is required");
  }
  if (zip.length === 0) {
    errors.push("Zip is required");
  }
  return errors;
}

export class ShippingForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, street, city, state, zip } = this.state;

    const errors = validate(name, street, city, state, zip);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.props.orderPlaced();
    }
  }

  handleMenuSelection = (event, index, val) => {

    this.setState({ state : val });

    let shipCost;
    if (val === 'MN'){
      shipCost = 0
    } else if (val.match(/^(NY|CA|MA)$/)) {
    shipCost = 7.5;
    } else if (val.match(/^(GA|AL|FL)$/)) {
    shipCost = 3.99;
    } else {
      shipCost = 5.99
    }

    this.props.sendShippingCost(shipCost);

  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        <input
          value={this.state.name}
          onChange={evt => this.setState({ name: evt.target.value })}
          type="text"
          placeholder="Name"
        />
        <input
          value={this.state.street}
          onChange={evt => this.setState({ street: evt.target.value })}
          type="text"
          placeholder="Street"
        />
        <input
          value={this.state.city}
          onChange={evt => this.setState({ city: evt.target.value })}
          type="text"
          placeholder="City"
        />
        <span>Select State</span>
        <DropDownMenu className="dropdownMenu" onChange={this.handleMenuSelection} >
          {stateAbrevs.map((i) => { return (<MenuItem value={i}  key={i} primaryText={i} />)})}
        </DropDownMenu>
        <input
          value={this.state.zip}
          onChange={evt => this.setState({ zip: evt.target.value })}
          type="text"
          placeholder="Zip"
        />
        <RaisedButton type="submit" label="Submit" backgroundColor= {"rgb(32,155,120)"} labelColor= {"rgb(255,255,255)"} />
      </form>
    );
  }
}
