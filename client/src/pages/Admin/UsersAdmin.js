import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getUsers } from '../../store/actions/usersActions';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import './user_styles.css';
import Navbar from '../../components/Navbar/Navbar';
import requireAdmin from '../../hoc/requireAdmin';

const Users = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="userAdmin mx-auto mt-2">
        <h2>Edit Users</h2>
        <div className="row m-5">
          {isLoading ? (
            <Loader />
          ) : (
              <>
                {users.map((user, index) => {
                  return (
                    <div className="userAdmin mx-auto">
                      <div className="con">
                        <div className="mt-2 text-light">
                          <div>
                            <span className="label">Name: </span>
                            <Link to={`/${user.username}`}>
                              <span className="info text-capitalize">{user.name}</span>
                            </Link>
                            <div>
                              <span className="label">Username: </span>
                              <span className="info">{user.username}</span>
                            </div>
                            <div>
                              <span className="label">Username: </span>
                              <span className="info">{user.stream_key}</span>
                            </div>
                            <div>
                              <span className="label">Email: </span>
                              <span className="info">{user.email}</span>
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
    </div >
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default compose(requireAuth, requireAdmin, connect(mapStateToProps, { getUsers }))(Users);
