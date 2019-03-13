import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Tables.css';

const Tables = ({currencies, renderPercentageChange, history}) => {
    return(
        
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {currencies.map((currency) => {
                        return <tr key={currency.id}
                                    onClick={() => history.push(`/currency/${currency.id}`)}>
                            <td>
                                <span className="Table-rank">{currency.rank}</span>
                                {currency.name}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.price}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.marketCap}
                            </td>
                            <td>{renderPercentageChange(currency.percentChange24h)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

Tables.propTypes = {
    currencies: PropTypes.array.isRequired,
    renderPercentageChange: PropTypes.func,
}

export default withRouter(Tables);