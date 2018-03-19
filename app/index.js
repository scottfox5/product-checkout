import React from 'react';
import ReactDOM from 'react-dom';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
      price: 'price',
      features: 'features',
      sku: 'sku',
      shippingCosts: 0,
    };
    console.log('ship', this.state.shippingCosts)
    this.prodChose = this.prodChose.bind(this);
    this.orderSuccess = this.orderSuccess.bind(this);
    this.shippingStateChose = this.shippingStateChose.bind(this);
    this.navHome = this.navHome.bind(this);
    this.navMarket = this.navMarket.bind(this);
    this.navHelp = this.navHelp.bind(this);
  }

  prodChose(name, price) {
    this.setState({
      name: name,
      price: price,
      orderProcess: 'checkout',
    });
  }
  orderSuccess() {
    this.setState({
      orderProcess: 'orderSuccess',
    });
  }
  navHome() {
    this.setState({
      orderProcess: 'homeView',
    });
  }
  navMarket() {
    this.setState({
      orderProcess: 'marketView',
    });
  }
  navHelp() {
    this.setState({
      orderProcess: 'helpView',
    });
  }


  shippingStateChose(st) {
    let costToShip;
    if (st === 'MN'){
      costToShip = 0
    } else if (st.match(/^(NY|CA|MA)$/)) {
    costToShip = 7.5;
    } else if (st.match(/^(GA|AL|FL)$/)) {
    costToShip = 3.99;
    } else {
      costToShip = 5.99
    }
    this.setState({
      shippingCosts: costToShip
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
        console.log("state:", this.state.products)
    })
  }

  render() {
    let price = parseFloat(this.state.price)
    let shippingCosts = parseFloat(this.state.shippingCosts);
    let totalPrice = Math.ceil((price + shippingCosts)*100)/100;
    let orderStep = this.state.orderProcess;
    let currentView;
    switch(orderStep){
      case 'checkout':
        currentView = (
                <div className="costShippingContainer">
                  <div className="costCalculator">
                    <p>Item: {this.state.name}</p>
                    <p>Subtotal: ${price}</p>
                    <p>S&H: ${shippingCosts}</p>
                    <p>Total: ${totalPrice}</p>
                  </div>
                  <ShippingForm shippingStateChose={this.shippingStateChose} orderSuccess={this.orderSuccess} />
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
            <Navigation navHome={this.navHome} navMarket={this.navMarket} navHelp={this.navHelp}/>
            <div>{currentView}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
