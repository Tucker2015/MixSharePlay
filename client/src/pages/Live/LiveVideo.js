import Layout from '../../layout/Layout';
import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
import config from '../../default';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './VideoPlayer.css';
import Chatbox from '../../components/ChatBox/ChatBox'
export default class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stream: false,
            videoJsOptions: null
        }
    }

    componentDidMount() {

        this.setState({

            stream: true,
            videoJsOptions: {
                playsinline: true,
                preload: true,
                autoplay: true,
                controls: true,
                sources: [{
                    src: 'http://127.0.0.1:' + config.rtmp_server.http.port + '/live/o1dh-XxK5/index.m3u8',
                    type: 'application/x-mpegURL'
                }],
                fluid: true,
            }

        }, () => {
            this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                console.log('onPlayerReady', this)
            });
        });
    };

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (


            <Layout>
                <div className="videoBox">
                    <div className="box1">
                        {this.state.stream ? (
                            <div className="">
                                <div className="" data-vjs-player >
                                    <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
                                </div>
                            </div>
                        ) : ' Loading ... '}
                    </div>
                    <div className="box1">
                        <Chatbox />
                    </div>
                </div>
            </Layout>



        )
    }
}