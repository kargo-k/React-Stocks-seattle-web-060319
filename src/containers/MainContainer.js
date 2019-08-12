import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {



  render() {
    return (
      <div>
        <SearchBar sortByPrice={this.props.sortByPrice} sortByTicker={this.props.sortByTicker} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.props.allStocks.stocks} handleBuyStock={this.props.handleBuyStock} />

          </div>
          <div className="col-4">

            <PortfolioContainer stocks={this.props.allStocks.portfolio} handleSellStock={this.props.handleSellStock} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
