import React from 'react';

import './styles.css';

const Loader = (props) => {
  return (
    <div className="loader-container row" {...props}>
      <div className="lds-hourglass"></div>
      <h2>MixShare Live</h2>
    </div>
  );
};

export default Loader;
