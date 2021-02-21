import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { reseedDatabase } from '../../store/actions/authActions';
import Upcoming from '../Shows/Upcoming';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';

const Home = ({ auth, isLoading }) => {


  return (

    <>
      <Navbar />
      <div className="homeBody mt-2">
        {isLoading ? (<Loader />) : (
          <>
            <h1 className="text-center mainLogoText">MixShare Live</h1>
            <hr></hr>
            {!auth.isAuthenticated ? (
              <div>
              </div>
            ) : (
                <>

                </>
              )}
          </>
        )}
        <div className="textContainer">
          <h2>Welcome to MixShare Live</h2>
          <h4>Live Video streaming platform for DJ's and Creators.</h4>
          <br></br>
          <p>We are just getting the final touches done to the site but you can still watch our content and live stream while we are ready.</p>
        </div>
        <hr></hr>
      </div>
      <Upcoming />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
