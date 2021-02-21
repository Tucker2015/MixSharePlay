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
import Loader from '../../components/Loader/Loader';
import {
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookShareCount,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";

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

        const shareUrl = 'https://live.mixshare.co.uk/stream/' + this.props.match.params.username;
        const title = this.props.match.params.username + ' Streaming Live now on Mixshare Live';

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
                            ) : <Loader />}

                            <div className="videoBar">
                                <h5><i className="icon-flash fas fa-circle"></i>{this.props.match.params.username} Live</h5>
                                <h5>Share to: </h5>
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={title}
                                    className="FacebookShare"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <FacebookShareCount url={shareUrl} className="FacebookShareCount">
                                    {count => count}
                                </FacebookShareCount>
                                <FacebookMessengerShareButton
                                    url={shareUrl}
                                    appId="907416556722170"
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton>
                                <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <div className="Demo__some-network__share-count">&nbsp;</div>
                                <EmailShareButton
                                    url={shareUrl}
                                    subject={title}
                                    body="I am streaming Live now on MixShare Live."
                                    className="Demo__some-network__share-button">
                                    <EmailIcon size={32} round />
                                </EmailShareButton>
                            </div>
                        </div>
                        <div className="box1">
                            <h3>Chat Box coming very soon !</h3>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
