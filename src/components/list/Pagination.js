import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

const Pagination = ({totalPages, page, changePage}) => {
    return(
        <div className="Pagination">
            <button 
                className="Pagination-button" 
                onClick={() => changePage("left")}
                disabled={page <= 1}>
                &larr;
            </button>
            <span className="Pagination-info">
                page <b>{page}</b> of <b>{totalPages}</b>
            </span>
            <button 
                className="Pagination-button" 
                onClick={() => changePage("right")}
                disabled={page >= totalPages}>
                &rarr;
            </button>
        </div>
    )
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired
}

export default Pagination;