import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
// import { Link } from 'react-router-dom';

import requireAdmin from '../../hoc/requireAdmin';
import Layout from '../../layout/Layout';
import './styles.css';

const UserList = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);
};

const Admin = () => {

  return (
    <div>
      <Navbar />
      <div className="admin-page mt-2">
        <h1>Admin dashboard</h1>

        <iframe src="https://live.mixshare.co.uk:8443/admin/" width="100%" height="1000px" className="mt-3" title="dashboard"></iframe>
      </div>
    </div>
  );
};

export default requireAdmin(Admin);
