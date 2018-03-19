import React from 'react';

const stateAbrevs = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']

export class ShippingStateDropdown extends React.Component {

  handleMenuSelection = (event, index, value) => {
    console.log("Handle Menu Selection", value)
    this.props.shippingStateChose(value);
    this.setState({
      value
    });
  }

  constructor(props) {
    super(props);
    this.handleClick =
      this.handleMenuSelection.bind(this);
  }

render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleMenuSelection}>
        {stateAbrevs.map((i) => { return (<MenuItem value={i}  key={i} primaryText={i} />)})}
      </DropDownMenu>
    );
  }

}
