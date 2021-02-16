import Layout from '../../layout/Layout';
import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
import config from '../../default';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './VideoPlayer.css';
import Chatbox from '../../components/ChatBox/ChatBox'
import Navbar from '../../components/Navbar/Navbar'
import Upcoming from '../Shows/Upcoming';
import Likes from '../../components/Likes/Likes';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageList from '../../components/MessageList/MessageList';
<<<<<<< HEAD
=======

>>>>>>> 29db16e2d929a18a5a4105393576db401eae605c
export default class VideoPlayer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            stream: false,
            videoJsOptions: null
        }
    }

    componentDidMount() {

        // This is the original axios request for username


        // axios.get('/user', {
        //     params: {
        //         username: this.props.match.params.username
        //     }
        // }).then(res => {

        this.setState({

            stream: true,
            videoJsOptions: {
                playsinline: true,
                preload: true,
                autoplay: true,
                controls: true,
                sources: [{
                    src: 'http://176.9.31.102:' + config.rtmp_server.http.port + '/live/o1dh-XxK5/index.m3u8',
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
                            {/* <div className="titleVid"><FontAwesomeIcon className="icon-flash" icon={faCircle} size={24} />
                            {this.props.match.params.username} Live
                </div> */}
                        </div>
                        <div className="box1">
<<<<<<< HEAD

=======
>>>>>>> 29db16e2d929a18a5a4105393576db401eae605c
                            <MessageForm />
                        </div>
                    </div>
                </div>
<<<<<<< HEAD

=======
>>>>>>> 29db16e2d929a18a5a4105393576db401eae605c
                <MessageList />
            </div>
        )
    }
}
