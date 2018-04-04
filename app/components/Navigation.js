import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

const navigationStyles = {
  appBar: {
    backgroundColor: 'rgb(19,84,122)',
    position: 'fixed'
  },
  drawer: {
    top: 70,
    width: 200,
    backGroundColor: 'rgb(200,200,200)'
  }
}

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
    this.navigateTo = this.navigateTo.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  navigateTo(view) {
    this.props.changeViewTo(view);
  }

  render() {
    return (
      <div>
        <AppBar title="Buymart" style={navigationStyles.appBar} onLeftIconButtonClick={this.handleToggle}/>
        <Drawer width={200} containerStyle={{top: 64, backgroundColor: "rgb(220,220,220)"}} open={this.state.open} >
          <MenuItem onClick={() => { this.navigateTo('home') }}>Home</MenuItem>
          <MenuItem onClick={() => { this.navigateTo('market') }}>Market</MenuItem>
          <MenuItem onClick={() => { this.navigateTo('help') }}>Help</MenuItem>
        </Drawer>
      </div>
    );
  }
}
