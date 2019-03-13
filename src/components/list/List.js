import React from 'react';
import {handleResponse} from '../../helpers';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Tables from './Tables';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies = () => {
        this.setState({ loading: true});

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ 
                    currencies: data.currencies, 
                    loading: false,
                    totalPages: data.totalPages,
                })
            })
            .catch((error) => {
                console.log('Error', error);
                this.setState({ 
                    error: error.errorMesage, 
                    loading: false
                })
            });
    }

    renderPercentageChange(percent){
        if(percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0){
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span>{percent}</span>
        }
    }

    changePage(direction) {
        const { page } = this.state;
        if(direction === 'left'){
            let nextPage = page - 1;
            this.setState({ page: nextPage}, () => {
                this.fetchCurrencies();
            })
        } 
        if(direction === 'right'){
            let nextPage = this.state.page + 1;
            this.setState({ page: nextPage}, () => {
                this.fetchCurrencies();
            })
        }
    }

    render(){
        const { loading, error, currencies, totalPages, page } = this.state;

        // Render spinning wheel while waiting for API to return currencies e.g. loading is set to true.
        if (loading){
            return <div className="loading-container"><Loading /></div>
        }

        // Render error message if fetch fails.
        if(error){
            return <div className="error">{error}</div>
        }

        return(
            <div>
                <Tables 
                    currencies={currencies} 
                    renderPercentageChange={this.renderPercentageChange}/>
                <Pagination 
                    page={page}
                    totalPages={totalPages} 
                    changePage={this.changePage}/>
            </div>
        );
    }
}

export default List;