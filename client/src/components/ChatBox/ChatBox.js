import React, { Component, useRef } from 'react'
import './chat.css'
import io from 'socket.io-client';
import { useSelector } from 'react-redux'

const socket = io.connect('', { secure: true, rejectUnauthorized: false })
export default ({ roomId }) => {
    const [messages, setmessages] = React.useState([]);
    const [message, setmessage] = React.useState("");

    const user = useSelector(x => x.auth);
    const sendMsg = () => {
        let msg = {
            message: message,
            time: Date.now(),
            username: user && user.me && user.me.username ? user.me.username : ""
        };
        setmessages([...messages, msg])
        setmessage("")
        setInterval(() => {
            scrollToBottom()
        }, 500);

        socket.emit("send-chat-message", roomId, msg)
    }
    const RefScroll = useRef(null);
    const scrollToBottom = () => {
        //    RefScroll.current.scrollIntoView({ behavior: 'smooth' });

        //    const scroll =
        //    RefScroll.current.scrollHeight -
        //    RefScroll.current.clientHeight;
        //    console.log(scroll);

        //    RefScroll.current.scrollTo(0, 400);
        if (RefScroll != null) { if (RefScroll.current && RefScroll.current.scrollHeight) RefScroll.current.scrollTop = RefScroll.current.scrollHeight + 100 }
    }
    React.useEffect(() => {
        socket.on('getRoom', room => {
            console.log(room)
            if (room && room.messages) {
                setmessages(room.messages)
                setInterval(() => {
                    scrollToBottom()
                }, 500);
            }
        })
        socket.on('chat-message', datamsg => {
            if (datamsg && datamsg.message) {
                setmessages(datamsg.message)
                setInterval(() => {
                    scrollToBottom()
                }, 500);
            }
        });
        if (roomId) {
            if (user && user.me && user.me.username) {
                socket.emit("join-room", roomId, user.me.username)
            }
            else {
                socket.emit("join-room-without-login", roomId)

            }
            socket.emit("view-add-stream",roomId)
        }
    }, [])
    return (
        <div className="mx-auto">
            <section className="msger">
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-comment-alt"></i> Chat</div>
                    {/* <div className="msger-header-options">
                        <span><i className="fas fa-cog"></i></span>
                    </div> */}
                </header>
                <main className="msger-chat" ref={RefScroll} >

                    {
                        messages.map((x, i) => <div key={i} className="msg left-msg">
                            {/* <div
                     className="msg-img"
                 ></div> */}

                            <div className="msg-bubble">
                                <div className="msg-info">
                                    <div className="msg-info-name">{x.username ? x.username : ""}</div>
                                    {/* <div className="msg-info-time">{x.time ? x.time : ""}</div> */}
                                </div>

                                <div className="msg-text">
                                    {
                                        x.message ? x.message : ""
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }

                </main>
                <div className="msger-inputarea">
                    <input type="text" readOnly={user && user.me && user.me != null ? false : true} value={message} placeholder={user && user.me && user.me != null ? "Enter your message..." : "Login to comment"} onKeyPress={event => {
                        if (event.key === 'Enter') {
                            sendMsg()
                        }
                    }} onChange={(e) => setmessage(e.target.value)} className="msger-input" />
                    <button type="button" onClick={() => {
                        if (user && user.me && user.me != null)
                            sendMsg()

                    }} className="msger-send-btn">Send</button>
                </div>
            </section>
            {/* <div className="bg-success m-2 p-4 text-light">
                <h4 className="text-center">Chat Box coming soon....</h4>
            </div> */}
        </div>
    )
}


