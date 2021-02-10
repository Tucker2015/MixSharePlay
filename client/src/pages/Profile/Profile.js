import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { getProfile, editUser, deleteUser } from '../../store/actions/userActions';
import { loadMe } from '../../store/actions/authActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import { profileSchema } from './validation';

const Profile = ({
  getProfile,
  user: { profile, isLoading, error },
  auth: { me },
  editUser,
  deleteUser,
  loadMe,
  history,
  match,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const retryCount = useRef(0);
  const matchUsername = match.params.username;

  useEffect(() => {
    getProfile(matchUsername, history);
  }, [matchUsername]);

  // if changed his own username reload me, done in userActions

  const onChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
  };

  const handleClickEdit = () => {
    retryCount.current = 0;
    setIsEdit((oldIsEdit) => !oldIsEdit);
    setImage(null);
    setAvatar(null);
    formik.setFieldValue('id', profile.id);
    formik.setFieldValue('name', profile.name);
    formik.setFieldValue('username', profile.username);
    formik.setFieldValue('live_stream', profile.live_stream);

  };

  const handleDeleteUser = (id, history) => {
    deleteUser(id, history);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      name: '',
      username: '',
      password: '',
      live_stream: '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('name', values.name);
      formData.append('username', values.username);
      formData.append('live_stream', values.live_stream);
      if (profile.provider === 'email') {
        formData.append('password', values.password);
      }
      editUser(values.id, formData, history);
      //setIsEdit(false);
    },
  });

  return (
    <Layout>
      <div className="users mx-auto mt-5">
        <h2>Profile Page</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
          <div className="mx-auto col mt-3">
            <div className="profile card mt-5 mx-auto">
              <img src={image ? image : profile.avatar} alt="" height="350" />
              <div className="card-header h3 text-center">{profile.name}'s Profile
</div>
              <div className="card-body">
                <h5 className="card-title">Username : {profile.username}</h5>
                <h5 className="card-title">Email : {profile.email}</h5>
                <h5 className="card-title">Live Stream Enabled : {profile.live_stream}</h5>
                <h5 className="card-title">Provider: {profile.provider}</h5>
                <h5 className="card-title">Stream Key: {profile.stream_key}</h5>
                <h5 className="card-title">Joined : {moment(profile.createdAt).format('dddd, MMMM Do YYYY, H:mm:ss')}</h5>
                <hr></hr>
                <button
                  className="btn bg-primary text-light"
                  type="button"
                  onClick={handleClickEdit}
                  disabled={!(me?.username === profile.username || me?.role === 'ADMIN')}
                >
                  {isEdit ? 'Cancel' : 'Edit'}
                </button>

              </div>
            </div>
          </div>

        )}

      {error && <p className="error">{error}</p>}

      {isEdit && (
        <div className="mx-auto col">
          <div className="profile card mt-1 ">
            <div className="card-header h3">Edit Profile</div>
            <div className="form p-3">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label>Avatar:</label>
                  <input name="image" className="btn w-75" type="file" onChange={onChange} />
                  {image && (
                    <button
                      className="btn w-100"
                      onClick={() => {
                        setImage(null);
                        setAvatar(null);
                      }}
                      type="button"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
                <input name="id" type="hidden" value={formik.values.id} />
                <div className="input-div card-title">
                  <label>Name:</label>
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
                </div>
                <div className="input-div">
                  <label>Username:</label>
                  <input
                    placeholder="Username"
                    name="username"
                    className="card-title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <p className="error">{formik.errors.username}</p>
                  ) : null}
                </div>
                {/* <div className="input-div">
                  <label>Live Stream Enabled:</label>
                  <input
                    placeholder="Yes / No"
                    name="live_stream"
                    className="w-100 disable"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.live_stream}
                  />
                  {formik.touched.live_stream && formik.errors.live_stream ? (
                    <p className="error">{formik.errors.live_stream}</p>
                  ) : null}
                </div> */}
                {profile.provider === 'email' && (
                  <div className="input-div">
                    <label>Password:</label>
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
                )}

                <button
                  className="btn bg-primary text-light"
                  type="submit"
                >Save
                </button>
                <button
                  className="btn bg-danger text-light"
                  type="button"
                  onClick={() => handleDeleteUser(profile.id, history)}
                >Delete Profile
                </button>
              </form>
            </div>

          </div>
        </div>

      )}


    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { getProfile, editUser, deleteUser, loadMe }),
)(Profile);
