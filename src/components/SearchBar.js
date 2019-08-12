import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input name="sortBySelection" type="radio" value="Alphabetically" onChange={props.sortByTicker} />
        Alphabetically
      </label>
      <label>
        <input name="sortBySelection" type="radio" value="Price" onChange={props.sortByPrice} />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => props.filterStocks(e)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
