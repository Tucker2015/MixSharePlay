import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import bg from './bg.jpg';
import logo from './logo.png';

import { reseedDatabase } from '../../store/actions/authActions';
import Upcoming from '../Shows/Upcoming';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import { logOutUser } from '../../store/actions/authActions';
import CookieConsent from "react-cookie-consent";

const Home = ({ auth, isLoading, logOutUser, history }) => {

  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };
  return (

    <>
      <Navbar />

      <div className="banner">
        <img src={bg} alt="" />
        <div className="content">
          <div>

            <h1>MixShare Live</h1>
          </div>
          <h2>Live Video Streaming</h2>
          <p>For Viewers, DJ's and Creators.</p>
          <Link to="/liveStream">
            <button className="button"><i className="fas fa-tv" aria-hidden="true"></i> Watch Live</button>
          </Link>
          {auth.isAuthenticated ? (
            <button className="button button2" onClick={onLogOut}>
              <a className="text-light" href="/"><i className="fas fa-sign-out-alt" aria-hidden="true"></i> Log out</a>
            </button>
          ) : (
            <Link to="/login">
              <button className="button button2"><i className="fas fa-sign-in-alt" aria-hidden="true"></i> Login</button>
            </Link>
          )}
        </div>
        <footer className="footerBx">
          <a href="https://mixshare.co.uk">©2021, MixShare.</a>
          <div className="">
            <a href="mailto:info@mixshare.co.uk?subject=Contact from MixShare Live">Contact Us</a>
            <a href="https://mixshare.co.uk/page/privacy">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logOutUser }))(Home);
