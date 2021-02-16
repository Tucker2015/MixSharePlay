import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Background from '../../assets/background.jpg';
import { loginUserWithEmail } from '../../store/actions/authActions';
import { FACEBOOK_AUTH_LINK, GOOGLE_AUTH_LINK } from '../../constants';
import { loginSchema } from './validation';
import './styles.css';
import Navbar from '../../components/Navbar/Navbar';
import fb from '../../assets/fb.png';

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
    <div>
      <section>

        <div className="imgBx">
          <img src={Background} alt="" />
        </div>
        <div className="contentBx">
          <div className="formBx">
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="inputBx">
                <span>Email</span>
                <input
                  placeholder="Email address"
                  name="email"
                  className="text"
                  type="text"

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
                <span>Password</span>
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
                <input
                  className="inputBx"
                  value="Sign In"
                  disabled={auth.isLoading || !formik.isValid}
                  type="submit"
                >
                </input>
                <span>
                  Don't have an account?</span>{' '}
                <Link className="bold" to="/register">
                  Sign Up
    </Link>
              </div>
              {auth.error && <p className="error">{auth.error}</p>}
            </form>
            <h5>Login with Facebook</h5>
            <div className="facebook">
              <a className="fb" href={FACEBOOK_AUTH_LINK}>
                <img src={fb} />
              </a>

            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithEmail }))(Login);
