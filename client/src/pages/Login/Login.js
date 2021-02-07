import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useFormik } from 'formik';

import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUserWithEmail } from '../../store/actions/authActions';
import { FACEBOOK_AUTH_LINK, GOOGLE_AUTH_LINK } from '../../constants';
import { loginSchema } from './validation';
import './styles.css';

const Login = ({ auth, history, loginUserWithEmail }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUserWithEmail(values, history);
    },
  });

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <Layout>
      <div className="containerCard">
        <div className="box">
          <span></span>
          <div className="content">
            <form onSubmit={formik.handleSubmit}>
              <h2>Log in with social media</h2>
              <a className="fb btn text-light" href={FACEBOOK_AUTH_LINK}>
                <i className="fa fa-facebook fa-fw" /> Login with Facebook
  </a>
              <a className="google btn text-light" href={GOOGLE_AUTH_LINK}>
                <i className="fa fa-google fa-fw" />
    Login with Google
  </a>
              <h2>Login with email address</h2>

              <div>
                <input
                  placeholder="Email address"
                  name="email"
                  className="text"
                  type="text"
                  style={{ width: '100%', color: '#000' }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  style={{ width: '100%', color: '#000' }}
                  className="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </div>
              {auth.error && <p className="error">{auth.error}</p>}
              <div>
                <button
                  className="btn submit bg-primary text-light"
                  style={{ width: 120 }}
                  disabled={auth.isLoading || !formik.isValid}
                  type="submit"
                >
                  Sign In
    </button>
              </div>
              <div>
                Don't have an account?{' '}
                <Link className="bold" to="/register">
                  Register
    </Link>
              </div>
            </form>
          </div>
        </div>


      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithEmail }))(Login);
