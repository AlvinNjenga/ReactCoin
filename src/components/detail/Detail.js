import React from 'react';
import { API_URL } from '../../config';
import { handleResponse, renderPercentageChange } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            currency: {},
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        console.log('Component did load!')
        const currencyId = this.props.match.params.id;
        
        this.setState({ loading: true})

        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency) => {
                this.setState({
                    loading: false,
                    error: null,
                    currency: currency
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage,
                })
            })
    }

    componentWillReceiveProps(newProps) {
        console.log('Component has been updated!')
    }

    componentDidUpdate(nextProps) {
        console.log('Component has been UPDATED!', nextProps)
    }

    render() {
        const { loading, error, currency } = this.state;
    
        // Render spinning wheel while waiting for API to return currencies e.g. loading is set to true.
        if (loading){
            return <div className="loading-container"><Loading /></div>
        }

        // Render error message if fetch fails.
        if(error){
            return <div className="error">{error}</div>
        }

        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name} ({currency.symbol})
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currency.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H Change <span className="Detail-value">{renderPercentageChange(currency.rank)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market Cap</span>
                        <span className="Detail-dollar">$</span>
                        {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span>
                        {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;