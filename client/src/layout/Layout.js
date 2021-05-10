import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import './styles.css';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
