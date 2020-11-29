import React from 'react';
import './App.css';
import StocksList from "./components/StocksList.jsx";

const stocksUrl = 'ws://stocks.mnet.website';
class App extends React.Component {
  state = {
    stocks: {}
  }

  componentDidMount = () => {
    this.connection = new WebSocket(stocksUrl);
    this.connection.onmessage = this.saveNewStockValues;
  }
  saveNewStockValues = (response) => {
    let result = JSON.parse(response.data);
    let current_time = Date.now();
    let new_stocks = this.state.stocks
    result.map((stock) => {
      if (this.state.stocks[stock[0]]) {
        new_stocks[stock[0]].current_value = Number(stock[1])
        new_stocks[stock[0]].history.push({ time: current_time, value: Number(stock[1]) })
      }
      else {
        new_stocks[stock[0]] = { current_value: stock[1], history: [{ time: Date.now(), value: Number(stock[1]) }] }
      }
    });
    this.setState({ stocks: new_stocks })
  }

  areStocksLoaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  }
  render() {
    return (
      <div className='container'>
        <div className='columns'>
          <StocksList
            stocks={this.state.stocks}
            areStocksLoaded={this.areStocksLoaded}
          />
        </div>
      </div>
    );
  }
}
export default App;
