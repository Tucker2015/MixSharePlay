import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
import config from '../default';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                    src: 'http://10.0.0.6:' + config.rtmp_server.http.port + '/live/06f-PM2EI/index.m3u8',
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

            <div >

                <div className="">
                    {this.state.stream ? (
                        <div className="">
                            <div data-vjs-player >
                                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
                            </div>
                        </div>
                    ) : ' Loading ... '}

                </div>

            </div>


        )
    }
}