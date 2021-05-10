import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getUsers } from '../../store/actions/usersActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';

import './styles.css';
import Navbar from '../../components/Navbar/Navbar';

const Users = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="users mx-auto mt-2">

        <h2>Users Page</h2>

        <div className="row m-5">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <div className="users mx-auto">
                    <div className="con mt-3">
                      <img src={user.avatar} className="avatar" />
                      <div className="info-container mt-2 text-light">
                        <div>
                          <span className="label">Name: </span>
                          <span className="info text-capitalize">{user.name}</span>
                          <div>
                            <span className="label">Username: </span>
                            <span className="info">{user.username}</span>
                          </div>
                          <div>
                            <span className="label">Live Streams: </span>
                            <span className="info text-uppercase" >{user.live_stream}</span>
                          </div>
                          <div>
                            <span className="label">Joined: </span>
                            <span className="info">
                              {moment(user.createdAt).format('Do MMMM  YYYY')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default compose(requireAuth, connect(mapStateToProps, { getUsers }))(Users);
