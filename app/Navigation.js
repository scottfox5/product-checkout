import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
    this.navigateHome = this.navigateHome.bind(this);
    this.navigateMarket = this.navigateMarket.bind(this);
    this.navigateHelp = this.navigateHelp.bind(this);
  }

  navigateHome() {
    this.props.navHome();
  }
  navigateMarket() {
    this.props.navMarket();
  }
  navigateHelp() {
    this.props.navHelp();
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <AppBar title="Buymart" style={{backgroundColor: "rgb(19,84,122)"}} onLeftIconButtonClick={this.handleToggle}/>
        <Drawer width={200} containerStyle={{top: 73, backgroundColor: "rgb(220,220,220)"}} open={this.state.open} >
          <MenuItem onClick={() => { this.navigateHome() }}>Home</MenuItem>
          <MenuItem onClick={() => { this.navigateMarket() }}>Market</MenuItem>
          <MenuItem onClick={() => { this.navigateHelp() }}>Help</MenuItem>
        </Drawer>
      </div>
    );
  }
}
