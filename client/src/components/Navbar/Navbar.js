import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top p-3">
      <div className="container-fluid">
        <img src={logo} alt="" width="40" height="40" className="d-inline-block align-center rounded mr-2" />
        <Link to={'/'} className={'navbar-brand '} >
          <h2 className="logo">MixShare Live</h2>
        </Link>
        {auth.isAuthenticated ? (
          <>
            <Link to={`/${auth.me.username}`}>
              <button className="goLive"><i className="fas fa-video"></i> Go Live</button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/"><i className="fa fa-home"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/liveStream"><i className="fas fa-tv" aria-hidden="true"></i> Streams</Link>
            </li>

            {auth.isAuthenticated ? (
              <>

                <li className="nav-item">
                  <Link to="/users"><i className="fa fa-users" aria-hidden="true"></i> Users</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${auth.me.username}`}><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
                </li>
                {auth.me?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/admin"><i className="fa fa-lock" aria-hidden="true"></i> Admin</Link>
                  </li>
                )}
                {auth.me?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/event"><i className="fa fa-lock" aria-hidden="true"></i> Event</Link>
                  </li>
                )}
                {auth.me?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/usersAdmin"><i className="fa fa-lock" aria-hidden="true"></i> Edit Users</Link>
                  </li>
                )}
                <li className="nav-item" onClick={onLogOut}>
                  <a href="/"><i className="fas fa-sign-out-alt" aria-hidden="true"></i> Log out</a>
                </li>
                <img className="img " src={auth.me.avatar} alt="avatar" />
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login"><i className="fas fa-sign-in-alt" aria-hidden="true"></i> Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i> Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <CookieConsent
        flipButtons
        contentClasses="text-capitalize"
        enableDeclineButton
        onDecline={() => {
          alert("Sorry you decline to Accept");

        }}
        buttonText="I Accept">This website uses cookies to enhance the user experience.</CookieConsent> */}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
