import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ query, setQuery }) => {
    return (
        <input
            type="text"
            placeholder="Search by keyword e.g. `Euro`"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
        />
    );
};

SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired
};

export default SearchBar;
