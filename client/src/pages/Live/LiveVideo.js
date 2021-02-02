import React, { Component } from 'react'
import Layout from '../../layout/Layout';
import VideoPlayer from '../../components/VideoPlayer'

export class LiveVideo extends Component {
    render() {
        return (
            <Layout>
                <VideoPlayer />
            </Layout>
        )
    }
}

export default LiveVideo
