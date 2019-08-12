import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'
const API = 'http://localhost:3000/stocks'

class App extends Component {

  constructor() {
    super()
    this.state = {
      stocks: [],
      portfolio: [],
      sortBy: '',
      filterType: ''
    }
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ stocks: data })
      })
  }

  sortStocks = () => {
    if (this.state.sortBy === 'Price') {
      let sortedStocks = this.state.stocks.sort(this.comparePrice)
    }
    else if (this.state.sortBy === "Alphabetically") {
      let sortedStocks = this.state.stocks.sort(this.compareTicker)
    }
    this.setState({
      stocks: sortedStocks
    })
  }

  comparePrice = (stockA, stockB) => {
    let a = stockA.price
    let b = stockB.price
    return b - a
  }

  compareTicker = (stockA, stockB) => {
    let a = stockA.ticker
    let b = stockB.ticker
    if (a < b) {
      return -1
    } else if (b < a) {
      return 1
    } else {
      return 0
    }
  }

  onChange = (ev) => {
    this.setState({
      sortBy: ev.target.value
    })
    this.sortStocks()
  }

  handleBuyStock = (buyStock) => {
    let stocks = [...this.state.stocks]
    let idx = stocks.indexOf(buyStock)
    let newPortfolio = this.state.portfolio
    newPortfolio.push(stocks.splice(idx, 1)[0])
    this.setState({ stocks: stocks, portfolio: newPortfolio })
  }

  handleSellStock = (sellStock) => {
    let portfolio = [...this.state.portfolio]
    let idx = portfolio.indexOf(sellStock)
    let newStocks = this.state.stocks
    newStocks.push(portfolio.splice(idx, 1)[0])
    this.setState({ stocks: newStocks, portfolio: portfolio })
  }

  render() {
    return (
      <div>
        <Header />
        <MainContainer
          allStocks={this.state}
          handleBuyStock={this.handleBuyStock}
          handleSellStock={this.handleSellStock}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
