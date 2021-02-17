import React from 'react';

import './styles.css';

const Loader = (props) => {
  return (
    <div className="loader-container" {...props}>
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loader;
