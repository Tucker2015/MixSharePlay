import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { useFormik } from 'formik';

import { registerUserWithEmail } from '../../store/actions/registerActions';
import { registerSchema } from './validation';
import './styles.css';
import Layout from '../../layout/Layout';

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
        <Layout>
            <div className="register mt-2">
                <div className="containerHeader">
                    <h1 className="headerFont">Register</h1>
                    <div className="containerCard">
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <form onSubmit={formik.handleSubmit} noValidate>
                                    <h2>Create new account</h2>
                                    <div>
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
                                        <input
                                            placeholder="Will you be Streaming Live ?"
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
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                    <div>
                                        <button className="btn submit bg-primary text-light" type="submit" disabled={isLoading || !formik.isValid}>
                                            Sign up now
    </button>
                                    </div>
                                    <div>
                                        Have an account?{' '}
                                        <Link className="bold" to="/login">
                                            Log In
    </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    register: state.register,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
