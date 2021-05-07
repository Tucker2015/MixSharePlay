import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
// import { Link } from 'react-router-dom';
import requireEvent from '../../hoc/requireEvent';
import './styles.css';

const Event = () => {

    return (
        <div>
            <Navbar />
            <div className="admin-page mt-2">
                <h1>Special Event</h1>


            </div>
        </div>
    );
};

export default requireEvent(Event);