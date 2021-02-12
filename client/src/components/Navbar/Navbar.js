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
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav ml-auto justify-content-center">
            <li className="nav-item">
              <Link to="/"><i class="fa fa-home"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/live"><i class="fas fa-video"></i> Live</Link>

            </li>
            <li className="nav-item">
              <Link to="/liveStream"><i class="fas fa-tv" aria-hidden="true"></i> Streams</Link>
            </li>

            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/users"><i class="fa fa-users" aria-hidden="true"></i> Users</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/${auth.me.username}`}><i class="fa fa-user" aria-hidden="true"></i> Profile</Link>
                </li>
                {auth.me?.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/admin"><i class="fa fa-lock" aria-hidden="true"></i> Admin</Link>
                  </li>
                )}
                <li className="nav-item" onClick={onLogOut}>
                  <a href="/"><i class="fas fa-sign-out-alt" aria-hidden="true"></i> Log out</a>
                </li>
                <img className="img " src={auth.me.avatar} alt="avatar" />
              </>
            ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login"><i class="fas fa-sign-in-alt" aria-hidden="true"></i> Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register"><i class="fa fa-user-plus" aria-hidden="true"></i> Register</Link>
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
