import React from 'react';
// import { Link } from 'react-router-dom';

import requireAdmin from '../../hoc/requireAdmin';
import Layout from '../../layout/Layout';
import './styles.css';

const Admin = () => {
  return (
    <Layout>
      <div className="admin-page mt-2">
        <h1>Admin dashboard</h1>

        <iframe src="http://95.216.190.57:8889/admin/" width="100%" height="1000px" className="mt-3" title="dashboard"></iframe>
      </div>
    </Layout>
  );
};

export default requireAdmin(Admin);
