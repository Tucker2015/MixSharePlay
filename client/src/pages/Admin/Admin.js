import React from 'react';
import { Link } from 'react-router-dom';

import requireAdmin from '../../hoc/requireAdmin';
import Layout from '../../layout/Layout';
import './styles.css';

const Admin = () => {
  return (
    <Layout>
      <div className="admin-page">
        <h1>Admin dashboard</h1>
        <p>
          This is the Admin page. Only the Admin can access this page. Return back to{' '}
          <Link className="bold" to="/">
            Home
          </Link>
        </p>
        <iframe src="http://10.0.0.6:8888/admin" width="100%" height="1000px"></iframe>
      </div>
    </Layout>
  );
};

export default requireAdmin(Admin);
