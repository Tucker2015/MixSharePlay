import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import bg from './bg.jpg';
import { reseedDatabase } from '../../store/actions/authActions';
import Upcoming from '../Shows/Upcoming';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';

const Home = ({ auth, isLoading }) => {


  return (

    <>
      <Navbar />

      <div className="banner">
        <img src={bg} alt="" />
        <div className="content">
          <h1>MixShare Live</h1>
          <h2>Live Video Streaming</h2>
          <p>For Viewers, DJ's and Creators.</p>
          <Link to="/liveStream">
            <button className="button">Watch Live</button>
          </Link>
          <Link to="/login">
            <button className="button button2">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
