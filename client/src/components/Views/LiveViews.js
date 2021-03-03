import React, { Component, useRef } from 'react'

import io from 'socket.io-client';
import { useSelector } from 'react-redux'

const socket = io.connect('', { secure: true, rejectUnauthorized: false })
export default ({ roomId }) => {
    const [views, setviews] = React.useState([]);
    // var liveviews = Math.floor(Math.random() * 20) + 1  ;
    React.useEffect(() => {
        // var liveviews = Math.floor(Math.random() * 20) + 1  ;
        socket.on('view-update', views => {
            console.log(views);
            setviews(views) 
        })
    }, [])
    return (
        <span className="views-span">
            <i className="icon-flash fas fa-eye"></i> {views} 
        </span>
    )
}


