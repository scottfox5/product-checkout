import React from 'react';

import { ShippingForm } from './ShippingForm';
import Navigation from './Navigation';

import { styles } from './../styles';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

const mainContainer = {
    fontFamily: styles.fontFamily,
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    height: '100vh',
};

const marketStyles = {

  productContainer: {
    display: "inline-flex",
    marginLeft: 200
  },
  root: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: "20"
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    height: 280,
    width: 200,
    padding: 20,
    marginTop: 50
  },
  gridTile: {
    backgroundColor: "rgb(255,255,255)",
    border: "2px solid black",
    borderRadius: "10px",
    textAlign: "center",
    height: "280",
    margin: "0",
    padding: "20"
  },
  nameStyle: {

  },
  priceStyle: {

  },
  featureStyle: {

  },
  buttonStyle: {
    margin: 10
  }

}

const checkoutStyles = {

  costShippingContainer: {
    width: '50%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontSize: 20,
    minWidth: 360,
    display: 'inline-flex'
  },
  costCalculator: {
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: 10,
    marginRight: 30
  }

}

const titleStyles = {
  textAlign: 'center',
  fontSize: 30,
  margiTop: 50
}

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
      price: 'price',
      features: 'features',
      sku: 'sku',
      shippingCost: 0,
    };
    this.changeView = this.changeView.bind(this);
    this.itemSelected = this.itemSelected.bind(this);
    this.getShippingCost = this.getShippingCost.bind(this);
    this.orderPlaced = this.orderPlaced.bind(this);
  }

  changeView(view) {
    this.setState({
      navigateView: view + 'View',
    });
  }

  itemSelected(name, price) {
    this.setState({
      name: name,
      price: price,
      navigateView: 'checkoutView',
    });
  }

  getShippingCost(value) {
    this.setState({
      shippingCost: value
    })
  }

  orderPlaced() {
    this.setState({
      navigateView: 'orderPlacedView',
    });
  }

  componentDidMount() {
    fetch(`https://api.myjson.com/bins/o87rf/`)
    .then(response => {
        return response.json()
    })
    .then(data => {
      let productData = data.map((item) => {
              let feats = item.features;
              return (
                <div style={marketStyles.root} key={item.sku}>
                  <GridList style={marketStyles.gridList} cols={1} rows={3} key={item.sku}>
                      <GridTile
                        style={marketStyles.gridTile}
                        key={item.sku}
                        children={
                          <div>
                            <h2 style={marketStyles.nameStyle}>{item.name}</h2>
                            <p style={marketStyles.priceStyle}>{item.price}</p>
                            <ul style={marketStyles.featureStyle}>
                              {feats.map((i) => { return (<li key={i}>{i}</li>)})}
                            </ul>
                            <RaisedButton style={marketStyles.buttonStyle} label="Buy" backgroundColor= {"rgb(32,155,120)"} labelColor= {"rgb(255,255,255)"} onClick={() => { this.itemSelected(item.name, item.price) }}/>
                          </div>}
                      >
                      </GridTile>
                  </GridList>
                </div>

              )
      });
        this.setState({
          products: productData
        });
    })
  }

  render() {
    let price = parseFloat(this.state.price)
    let shippingCost = parseFloat(this.state.shippingCost);
    let totalPrice = Math.ceil((price + shippingCost)*100)/100;
    let currentView;
    const homeView = <h1 style={titleStyles}>Home</h1>;
    const marketView = <div style={marketStyles.productContainer}>{this.state.products}</div>;
    const helpView = <h1 style={titleStyles}>Help</h1>;
    const checkoutView = (
            <div style={checkoutStyles.costShippingContainer}>
              <div style={checkoutStyles.costCalculator}>
                <p>Item: {this.state.name}</p>
                <p>Subtotal: ${price}</p>
                <p>S&H: ${shippingCost}</p>
                <p>Total: ${totalPrice}</p>
              </div>
              <ShippingForm sendShippingCost={this.getShippingCost} orderPlaced={this.orderPlaced} />
            </div>
            );
    const orderPlacedView = <h1 style={titleStyles}>Thank You</h1>;

    switch(this.state.navigateView){
      case 'homeView':
        currentView = homeView
        break;
      case 'marketView':
        currentView = marketView
        break;
      case 'helpView':
        currentView = helpView
        break;
      case 'checkoutView':
        currentView = checkoutView
        break;
      case 'orderPlacedView':
        currentView = orderPlacedView
        break;
      default:
        currentView = marketView
    };

    return (
      <div style={mainContainer}>
        <MuiThemeProvider>
          <div>
            <Navigation changeViewTo={this.changeView} />
            <div>{currentView}</div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
