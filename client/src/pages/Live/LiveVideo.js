import Layout from '../../layout/Layout';
import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
import config from '../../default';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import watermark from 'videojs-watermark';
import '../../../node_modules/videojs-watermark/dist/videojs-watermark.css';
import './VideoPlayer.css';
import Users from '../Users/Users';
import Navbar from '../../components/Navbar/Navbar'
export default class VideoPlayer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            stream: false,
            videoJsOptions: null
        }
    }

    componentDidMount() {
        videojs.registerPlugin('watermark', watermark)


        axios.get('/streams/user', {
            params: {
                username: this.props.match.params.username
            }
        }).then(res => {

            this.setState({

                stream: true,
                videoJsOptions: {
                    plugins: {
                        watermark: {
                            image: 'https://ktinternet.net/radio-logos/video_logo.png',
                            position: 'top-left',
                            hideOnReady: true,
                            fadeTime: 10000,
                        },
                    },
                    retryOnError: true,
                    playsinline: true,
                    suppressNotSupportedError: true,
                    notSupportedMessage: 'Currently The stream is unavailable',
                    preload: true,
                    autoplay: true,
                    controls: true,
                    sources: [{
                        src: 'https://live.mixshare.co.uk:' + config.rtmp_server.https.port + '/live/' + res.data.stream_key + '/index.m3u8',
                        type: 'application/x-mpegURL'
                    }],
                    fluid: true,
                }

            }, () => {
                this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                    console.log('onPlayerReady', this)
                });
            });
        })
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (


            <div>
                <Navbar />
                <div className="cont">

                    <div className="videoBox mx-auto">
                        <div className="box1">
                            {this.state.stream ? (
                                <div className="">
                                    <div className="" data-vjs-player >
                                        <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
                                    </div>
                                </div>
                            ) : ' Loading ... '}

                            {/* This Shows the current username who is streaming  */}

                            <h5 className="titleVid" style={{ color: "#fff" }}><i class="icon-flash fas fa-circle"></i>
                                {this.props.match.params.username} Live
                </h5>
                        </div>
                        <div className="box1">
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}
