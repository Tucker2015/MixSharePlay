import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <h2 className="logo">MixShare Live</h2>

        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/live">Live</Link>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${auth.me.username}`}>Profile</Link>
                </li>
                {auth.me?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/admin">Admin</Link>
                  </li>
                )}
                <li className="nav-item" onClick={onLogOut}>
                  <a href="/">Log out</a>
                </li>
              </>
            ) : (
                <>


                  <li className="nav-item">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);