import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { reseedDatabase } from '../../store/actions/authActions';
import Upcoming from '../Shows/Upcoming';
import './styles.css';
import Loader from '../../components/Loader/Loader';



const Home = ({ auth, isLoading }) => {


  return (
    <Layout>
      <>
        <div className="homeBody mt-2">
          {isLoading ? (<Loader />) : (
            <>
              <h1 className="text-center mainLogoText">MixShare Live</h1>
              <hr></hr>
              {!auth.isAuthenticated ? (
                <div>
                </div>
              ) : (
                  <>
                    <h5 className="text-center text-light text-capitalize">Welcome back {auth.me.name} </h5>

                    <p className="text-center text-light text-capitalize mt-4">We are just getting the final touches done to the site but you can still Stream live.</p>
                  </>
                )}
            </>
          )}
        </div>
      </>
      <Upcoming />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
