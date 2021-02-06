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
import { profileSchema } from '../Profile/validation';

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
      <div className="container mt-5">
        <h1 class="text-center mainLogoText">MixShare Live</h1>

        {!auth.isAuthenticated ? (
          <div className="container">
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
                Welcome <span className="name text-light h3">{auth.me.name} Stream Key: {auth.me.stream_key}</span> !
    </p>

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
