import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { reseedDatabase } from '../../store/actions/authActions';

import './styles.css';




const Home = ({ auth }) => {


  return (
    <Layout>
      <div className="homeBody mt-5">
        <h1 className="text-center mainLogoText">MixShare Live</h1>
        <h3 className="text-center text-light"> Test Site for MixShare Live </h3>
        {!auth.isAuthenticated ? (
          <div>


          </div>
        ) : (
            <>
              <h5 className="text-center text-light ">Welcome back {auth.me.name} </h5>
            </>
          )}

      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
