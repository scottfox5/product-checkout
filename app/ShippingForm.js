import React from 'react';
import { ShippingStateDropdown } from './ShippingStateDropdown';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    // errors.push("State is required");
  }
  if (zip.length === 0) {
    errors.push("Zip is required");
  }
  return errors;
}

const stateAbrevs = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']


export class ShippingForm extends React.Component {

    handleMenuSelection = (event, index, value) => {
      this.props.shippingStateChose(value);
      this.setState({
        shipState: value
      });
    }

  constructor() {
    super();
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      value: 1,
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, street, city, state, zip } = this.state;

    const errors = validate(name, street, city, state, zip);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      this.props.orderSuccess();
    }
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
        <DropDownMenu value={this.state.value} onChange={this.handleMenuSelection}>
          {stateAbrevs.map((i) => { return (<MenuItem value={i}  key={i} primaryText={i} />)})}
        </DropDownMenu>
        <input
          value={this.state.zip}
          onChange={evt => this.setState({ zip: evt.target.value })}
          type="text"
          placeholder="Zip"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
