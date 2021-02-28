import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
// import moment from 'moment';
import { withRouter } from 'react-router-dom';
import obs from './obs.png';
import { getProfile, editUser, deleteUser } from '../../store/actions/userActions';
import { loadMe } from '../../store/actions/authActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import { profileSchema } from './validation';

import './styles.css';

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
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('name', values.name);
      formData.append('username', values.username);
      if (profile.provider === 'email') {
        formData.append('password', values.password);
      }
      editUser(values.id, formData, history);
      //setIsEdit(false);
    },
  });
  let qrCode = "larix://set/v1?conn[][url]=rtmp%3A%2F%2F176.9.31.54%3A1935%2Flive%2F" + profile.stream_key + "&conn[][name]=MixShare%20Live&conn[][overwrite]=on&enc[vid][res]=1280x720&enc[vid][bitrate]=1000&deleteConn=1";
  return (
    <Layout>
      <div className="profile">
        <h2 className="header mt-2">Profile Page</h2>

        {isLoading ? (
          <Loader />
        ) : (
            <div className="profile-info mt-3 mx-auto">
              <img src={image ? image : profile.avatar} className="avatar" alt="avatar" />
              <div className="info-container text-light">
                <div>
                  <span className="label">Name: </span>
                  <span className="info text-capitalize">{profile.name}</span>
                </div>
                <div>
                  <span className="label">Stream Key: </span>
                  <span className="info">{profile.stream_key}</span>
                </div>
                <div>
                  <span className="label">Username: </span>
                  <span className="info">{profile.username}</span>
                </div>
                <div>
                  <span className="label">Email: </span>
                  <span className="info">{profile.email}</span>
                </div>

                <div>
                  <button
                    className="btn"
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
          <div className="profile-info mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="input-div">
                <label>Avatar:</label>
                <input name="image" type="file" onChange={onChange} style={{ color: "#000", fontSize: "14px" }} />
                {image && (
                  <button
                    className="btn btn2"
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
              <div className="input-div">
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
                  className=""
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className="error">{formik.errors.username}</p>
                ) : null}
              </div>
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
              <div className="btn-container">
                <button type="submit" className="btn">
                  Save
              </button>
                <button
                  onClick={() => handleDeleteUser(profile.id, history)}
                  type="button"
                  className="btn btn2"
                >
                  Delete profile
              </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="mx-auto mt-3">
        <h3 className="text-center text-light">Connecting to MixShare Live</h3>
        <p className="textBody text-light">
          You can use <a target="_blank" href="https://obsproject.com/">OBS</a> or
            <a target="_blank" href="https://www.xsplit.com/">XSplit</a> to Live stream.  We also support <a target="_blank" href="https://restream.io/">restream.io</a> and <a target="_blank" href="https://castr.io/">castr.io</a></p>
        <p className="textBody text-light">If you're using OBS, go to Settings - Stream and select Custom from service dropdown. Enter <b>rtmp://live.mixshare.co.uk:1935/live</b> in server input field. Also, add your stream key. Click apply to save.</p>
        <p className="textBody text-light">Your Stream Key : {profile.stream_key}</p>
        <div className="obs">
          <img src={obs} alt="" />
        </div>
      </div>
      <div className="profile mt-5">
        <h3 className="text-center text-light">Using Larix with Mobile</h3>
        <hr className="my-3" />
        <p className="textBody text-light">
          To use Larix simply download the App from the links below :
                    </p>
        <div className="">
          <h5 className="textBody text-light" >Download Larix for Mobile</h5>
          <a href="https://play.google.com/store/apps/details?id=com.wmspanel.larix_broadcaster" class="btn btn-secondary btn-m mr-2" role="button" aria-disabled="true">Download Larix for Android</a>

          <a href="https://apps.apple.com/us/app/larix-broadcaster/id1042474385" class="btn btn-secondary btn-m m-1" role="button" aria-disabled="true">Download Larix for iOS</a>
          <p className="textBody text-light mt-3">Then hit the button below to open your profile in Larix automatically :</p>
          <a href={qrCode} class="btn btn-secondary btn-lg mt-2 mb-5" role="button" aria-disabled="true">Open Profile in Larix</a>
        </div>
      </div>
    </Layout >
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