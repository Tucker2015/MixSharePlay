import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';
import { registerUserWithEmail } from '../../store/actions/registerActions';
import { registerSchema } from './validation';
import './styles.css';
import Layout from '../../layout/Layout';
import Navbar from '../../components/Navbar/Navbar';
import Background from '../../assets/background.jpg';

const Register = ({ auth, register: { isLoading, error }, history, registerUserWithEmail }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      live_stream: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerUserWithEmail(values, history);
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
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="inputBx">
                <span>Name</span>
                <input
                  placeholder="Name"
                  name="name"
                  className=""
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="error">{formik.errors.name}</p>
                ) : null}
                <span>Username</span>
                <input
                  placeholder="Username"
                  name="username"
                  className=""
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className="error">{formik.errors.username}</p>
                ) : null}
                <span>Email Address</span>
                <input
                  placeholder="Email address"
                  name="email"
                  className=""
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
                <span>Will you be Streaming Live</span>
                <input
                  placeholder="Yes / No ?"
                  name="live_stream"
                  className=""
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.live_stream}
                />
                {formik.touched.live_stream && formik.errors.live_stream ? (
                  <p className="error">{formik.errors.live_stream}</p>
                ) : null}
                <span>Password</span>
                <input
                  placeholder="Password"
                  name="password"
                  className=""
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
                <input
                  disabled={isLoading || !formik.isValid}
                  className="inputBx"
                  value="Register Account"
                  disabled={auth.isLoading || !formik.isValid}
                  type="submit"
                >
                </input>
                <span>
                  Already have an Account ?</span>{' '}
                <Link className="bold" to="/login">
                  Sign In
    </Link>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  register: state.register,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
