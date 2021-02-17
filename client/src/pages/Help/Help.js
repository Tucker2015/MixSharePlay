import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import './styles.css';

const Help = () => {
    return (
        <Layout>
            <div>
                <div className="header">
                    <h2>Help Page</h2>
                </div>
                <div className="help">
                    <p>Settings for MixShare Live</p>
                </div>
            </div>
        </Layout>
    );
};

export default Help;
