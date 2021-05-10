import React, { useEffect } from 'react';
import requireAdmin from '../../hoc/requireAdmin';
import './styles.css';
import Layout from '../../layout/Layout'

const Admin = () => {

  return (
    <Layout>
      <div className="admin-page mt-2">
        <h1>Admin dashboard</h1>

        <iframe src="https://live.mixshare.co.uk:8443/admin/" width="100%" height="1000px" className="mt-3" title="dashboard"></iframe>
      </div>
    </Layout>
  );
};

export default requireAdmin(Admin);
