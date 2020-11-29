import React from 'react'
import StockRow from './StockRow.jsx'

const StocksList = (props) => {
  return (
    <div id='stocks_list'>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Value
              </th>
              <th>History</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) => {
              let current_stock = props.stocks[stock_name];
              return (
                <StockRow
                  key={index} stock_name={stock_name}
                  stock_data={current_stock}
                />
              )
            }
            )}
            {props.areStocksLoaded() ? null : <tr><td colSpan='4'>No stocks loaded yet!</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StocksList;
