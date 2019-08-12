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
      savedStocks: [],
      savedPortfolio: []
    }
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ stocks: data, savedStocks: data })
      })
  }

  sortByTicker = () => {
    this.setState(prevState => {
      let stocks = [...prevState.stocks]
      let portfolio = [...prevState.portfolio]
      let sortedStocks = stocks.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      let sortedPortfolio = portfolio.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      return { stocks: sortedStocks, portfolio: sortedPortfolio }
    })
  }

  sortByPrice = () => {
    this.setState(prevState => {
      let stocks = [...prevState.stocks]
      let portfolio = [...prevState.portfolio]
      let sortedStocks = stocks.sort((a, b) => (a.price > b.price) ? 1 : -1)
      let sortedPortfolio = portfolio.sort((a, b) => (a.price > b.price) ? 1 : -1)
      return { stocks: sortedStocks, portfolio: sortedPortfolio }
    })
  }

  filterStocks = (e) => {
    e.persist()
    this.setState(prevState => {
      let stocks = [...prevState.savedStocks]
      let portfolio = [...prevState.savedPortfolio]
      let filteredStocks = stocks.filter(stock => {
        if (stock.type === e.target.value) {
          return stock
        }
      })
      let filteredPortfolio = portfolio.filter(stock => {
        if (stock.type === e.target.value) {
          return stock
        }
      })
      return { stocks: filteredStocks, portfolio: filteredPortfolio }
    })
  }

  handleBuyStock = (buyStock) => {
    let stocks = [...this.state.stocks]
    let idx = stocks.indexOf(buyStock)
    let newPortfolio = this.state.portfolio
    newPortfolio.push(stocks.splice(idx, 1)[0])
    this.setState({
      stocks: stocks,
      savedStocks: stocks,
      portfolio: newPortfolio,
      savedPortfolio: newPortfolio
    })
  }

  handleSellStock = (sellStock) => {
    let portfolio = [...this.state.portfolio]
    let idx = portfolio.indexOf(sellStock)
    let newStocks = this.state.stocks
    newStocks.push(portfolio.splice(idx, 1)[0])
    this.setState({
      stocks: newStocks,
      savedStocks: newStocks,
      portfolio: portfolio,
      savedPortfolio: portfolio
    })
  }

  render() {
    return (
      <div>
        <Header />
        <MainContainer
          allStocks={this.state}
          handleBuyStock={this.handleBuyStock}
          handleSellStock={this.handleSellStock}
          onChange={this.onChange}
          sortByPrice={this.sortByPrice}
          sortByTicker={this.sortByTicker}
          filterStocks={this.filterStocks} />
      </div>
    );
  }
}

export default App;