import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
import config from '../../default';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import watermark from 'videojs-watermark';
import '../../../node_modules/videojs-watermark/dist/videojs-watermark.css';
import './VideoPlayer.css';
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader';
import ChatBox from '../../components/ChatBox/ChatBox';
import LiveView from '../../components/Views/LiveViews';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, EmailIcon, EmailShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import Upcoming from '../Shows/Upcoming'
import requireEvent from '../../hoc/requireEvent';

class EventVideoPlayer extends React.Component {

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
                username: this.props.match.params.username,

            }

        }).then(res => {
            // console.log(res.data);
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
                    poster: 'https://ktinternet.net/radio-logos/video_poster.png',
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
        const fburl = 'https://live.mixshare.co.uk/';
        const fbtitle = this.props.match.params.username + ' Playing live now on MixShare Live';
        const shareUrl = 'https://live.mixshare.co.uk/streams/' + this.props.match.params.username;
        const title = this.props.match.params.username + ' Playing live now on MixShare Live';

        return (
            <>
                <Navbar />
                <h1>TEST PAGE</h1>
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
                            <h5>
                                <i className="icon-flash fas fa-circle"></i>{this.props.match.params.username} Live
                                {/* <LiveView roomId={this.props.match.params.username} /> */}

                            </h5>
                            <FacebookShareButton
                                url={fburl}
                                quote={fbtitle}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={shareUrl}
                                title={title}
                                className="Demo__some-network__share-button"
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <EmailShareButton
                                url={shareUrl}
                                subject={title}
                                body="Check me streaming live on MixShare Live"
                                className="Demo__some-network__share-button"
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                            <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>
                    <div className="box2">
                        {/* <ChatBox roomId={this.props.match.params.username} /> */}
                        <ChatBox />

                    </div>
                </div>

            </>


        )
    }
}
export default requireEvent(EventVideoPlayer);