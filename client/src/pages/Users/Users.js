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

const Users = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div className="users">
        <h1>Users page</h1>
        <p>
          This is the Users page. Here are listed all of the users of the app. Click the avatar or
          the username link to go to user's profile. Only authenticated users can see this page.
        </p>
        <div className="row">
          {isLoading ? (
            <Loader />
          ) : (
              <>
                {users.map((user, index) => {
                  return (
                    <div key={index} className="mx-auto card bg-dark text-light m-2">
                      <Link to={`/${user.username}`}>
                        <img src={user.avatar} width="200" height="200" />
                      </Link>
                      <div>
                        <h4 className="card-header h3">{user.name}</h4>
                      </div>
                      <div className="info-container">
                        <div>
                          <span className="label">Username: </span>
                          <Link to={`/${user.username}`} className="text-light">
                            {user.username}
                          </Link>
                        </div>

                        <div>
                          <span className="label">Joined: </span>
                          <span className="info">
                            {moment(user.createdAt).format('Do MMMM  YYYY')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default compose(requireAuth, connect(mapStateToProps, { getUsers }))(Users);
