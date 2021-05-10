import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logOutUser } from '../../store/actions/authActions';
import './NavBar.module.css'

const Navbar = ({ auth, logOutUser, history }) => {
    const onLogOut = (event) => {
        event.preventDefault();
        logOutUser(history);
    };

    return (

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
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
