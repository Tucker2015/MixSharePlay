import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { reseedDatabase } from '../../store/actions/authActions';
import Upcoming from '../Shows/Upcoming';
import './styles.css';




const Home = ({ auth }) => {


  return (
    <Layout>
      <div className="homeBody mt-2">
        <h1 className="text-center mainLogoText">MixShare Live</h1>
        <h3 className="text-center text-light"> Test Site for MixShare Live </h3>
        {!auth.isAuthenticated ? (
          <div>


          </div>
        ) : (
            <>
              <h5 className="text-center text-light text-capitalize">Welcome back {auth.me.name} </h5>
            </>
          )}

      </div>

      <Upcoming />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
