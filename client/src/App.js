import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import VideoPlayer from './pages/Live/LiveVideo'
import LiveStreams from './pages/Live/LiveStream'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import UsersAdmin from './pages/Admin/UsersAdmin';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/NotFound/NotFound';
import Upcoming from './pages/Shows/Upcoming';
import Loader from './components/Loader/Loader';
import Help from './pages/Help/Help';
import { logInUserWithOauth, loadMe } from './store/actions/authActions';


const App = ({ logInUserWithOauth, auth, loadMe }) => {
  useEffect(() => {
    loadMe();
  }, [loadMe]);

  //redosled hookova
  useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';

    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [auth.isAuthenticated, auth.token, loadMe, auth.isLoading, auth.appLoaded]);

  return (
    <>
      {auth.appLoaded ? (
        <Switch>
          <Route path="/login" component={Login} />

          <Route exact path="/liveStream" render={(props) => (
            <LiveStreams  {...props} />
          )} />
          <Route exact path="/stream/:username" render={(props) => (
            <VideoPlayer {...props} />
          )} />
          <Route path="/register" component={Register} />
          <Route path="/users" component={Users} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/usersAdmin" component={UsersAdmin} />
          <Route path="/admin" component={Admin} />
          <Route path="/shows" component={Upcoming} />
          <Route path="/help" component={Help} />
          <Route exact path="/:username" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      ) : (
          <Loader />
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logInUserWithOauth, loadMe }))(App);
