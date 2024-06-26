// src/components/RowDetailCard.js
import React from 'react';
import PropTypes from 'prop-types';

const RowDetailCard = ({ details }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 m-4">
            <p className="whitespace-pre-line">{details}</p>
        </div>
    );
};

RowDetailCard.propTypes = {
    details: PropTypes.string.isRequired
};

export default RowDetailCard;
