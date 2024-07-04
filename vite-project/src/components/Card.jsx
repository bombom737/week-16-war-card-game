import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ value }) {
  return (
    <div className="card">
      <span>{value}</span>
    </div>
  );
}

Card.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
};

export default Card;
