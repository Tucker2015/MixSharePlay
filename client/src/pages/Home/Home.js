import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LiveStreams from '../Live/LiveStream';
import Layout from '../../layout/Layout';
// import MessageList from '../../components/MessageList/MessageList';
// import MessageForm from '../../components/MessageForm/MessageForm';
import { reseedDatabase } from '../../store/actions/authActions';

import './styles.css';

const ReseedMessage = ({ handleReseed }) => {
  return (
    <div>
      {/* <span style={{ marginRight: '10px' }}>
        If the app has been vandalized just reseed the database by clicking this button
      </span>
      <button onClick={handleReseed} className="btn reseed-btn">
        Reseed Database
      </button> */}
    </div>
  );
};

const Home = ({ auth, reseedDatabase }) => {
  const handleReseed = () => {
    reseedDatabase();
  };

  return (
    <Layout>
      <LiveStreams />
      <div className="home-page mt-2">
        <div className="bg-success w-25 p-2 text-center"><h4>Home Page</h4></div>

        {!auth.isAuthenticated ? (
          <div>
            <p>
              Welcome guest !{' '}
              <Link className="bold" to="/login">
                Log in
              </Link>{' '}
              or{' '}
              <Link className="bold" to="/register">
                Register
              </Link>
            </p>
            {/* <ReseedMessage handleReseed={handleReseed} /> */}

          </div>
        ) : (
            <>
              <p>
                Welcome <span className="name">{auth.me.name}</span> !
            </p>
              <ReseedMessage handleReseed={handleReseed} />
              {/* <MessageForm /> */}
            </>
          )}
        {/* <MessageList /> */}

      </div>

    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
