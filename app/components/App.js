import React from 'react';

import { ShippingForm } from './ShippingForm';
import Navigation from './Navigation';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
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
};

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
    this.prodChose = this.prodChose.bind(this);
    this.orderSuccess = this.orderSuccess.bind(this);
    this.getShippingCost = this.getShippingCost.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  prodChose(name, price) {
    this.setState({
      name: name,
      price: price,
      navigateView: 'checkout',
    });
  }

  orderSuccess() {
    this.setState({
      navigateView: 'orderSuccess',
    });
  }

  changeView(view) {

    if (view === 'home') {
      this.setState({
        navigateView: 'homeView',
      });
    } else if (view === 'market') {
      this.setState({
        navigateView: 'marketView',
      });
    } else if (view === 'help') {
      this.setState({
        navigateView: 'helpView',
      });
    }

  }

  getShippingCost(value) {
    this.setState({
      shippingCost: value
    })
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
                <div style={styles.root} key={item.sku}>
                  <GridList style={styles.gridList} cols={1} rows={3} key={item.sku}>
                      <GridTile
                        style={styles.gridTile}
                        key={item.sku}
                        children={
                          <div>
                            <h2 style={styles.nameStyle}>{item.name}</h2>
                            <p style={styles.priceStyle}>{item.price}</p>
                            <ul style={styles.featureStyle}>
                              {feats.map((i) => { return (<li key={i}>{i}</li>)})}
                            </ul>
                            <RaisedButton style={styles.buttonStyle} label="Buy" backgroundColor= {"rgb(32,155,120)"} labelColor= {"rgb(255,255,255)"} onClick={() => { this.prodChose(item.name, item.price) }}/>
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
    switch(this.state.navigateView){
      case 'checkout':
        currentView = (
                <div className="costShippingContainer">
                  <div className="costCalculator">
                    <p>Item: {this.state.name}</p>
                    <p>Subtotal: ${price}</p>
                    <p>S&H: ${shippingCost}</p>
                    <p>Total: ${totalPrice}</p>
                  </div>
                  <ShippingForm sendShippingCost={this.getShippingCost} orderSuccess={this.orderSuccess} />
                </div>
                );
                break;
      case 'orderSuccess':
        currentView = (
          <p className="placeHolderText">Success! Your order has been placed.</p>
        );
        break;
      case 'homeView':
        currentView = (
          <p className="placeHolderText">Home</p>
        );
        break;
      case 'marketView':
        currentView = (
                <div style={styles.productContainer}>{this.state.products}</div>
                );
        break;
      case 'helpView':
        currentView = (
          <p className="placeHolderText">Help</p>
        );
        break;
      default:
        currentView = (
                <div style={styles.productContainer}>{this.state.products}</div>
                );
    };
    return (
      <div id="">
        <MuiThemeProvider>
          <div>
            <Navigation changeViewTo={this.changeView} />
            <div>{currentView}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
