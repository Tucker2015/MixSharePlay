import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import config from '../../default';
import Layout from '../../layout/Layout'
import './LiveStream.css';
import Upcoming from '../Shows/Upcoming';
export default class LiveStreams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            live_streams: []
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getLiveStreams();
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getLiveStreams() {
        axios.get('https://live.mixshare.co.uk:8443/api/streams')
            .then(res => {
                let streams = res.data;
                if (typeof (streams['live'] !== 'undefined')) {
                    this.getStreamsInfo(streams['live']);
                    // console.log(res.data);
                }
            });
    }

    getStreamsInfo(live_streams) {
        axios.get('/streams/info', {
            params: {
                streams: live_streams
            }
        }).then(res => {
            // console.log(res.data);
            this.setState({
                live_streams: res.data
            }, () => {
                // console.log(this.state);

            });
        });
    }

    render() {
        let streams = this.state.live_streams.map((stream, index) => {
            return (
                <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>

                    <span className="live-label">LIVE</span>

                    <Link to={'/stream/' + stream.username}>
                        <div className="stream-thumbnail">
                            <img src={'/thumbnails/' + stream.stream_key + '.png'} style={{ width: "100%", height: "200px" }} alt="thumbnail" />
                        </div>
                    </Link>

                    <span className="username">
                        <Link to={'/stream/' + stream.username}>
                            {stream.username}
                        </Link>

                    </span>

                </div>
            );
        });

        return (
            <Layout>
                <div className="container mt-2 ">
                    <div className="users mx-auto mt-2">
                        <h2>Live Streams</h2>
                    </div>
                    <div className="streams row mt-5">
                        {streams}
                    </div>
                    <Upcoming />
                </div>
            </Layout>
        )
    }
}
