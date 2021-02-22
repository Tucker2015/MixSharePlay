import React, { Component } from 'react'
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
        socket.emit("send-chat-message", roomId, msg)
    }
    React.useEffect(() => {
        socket.on('getRoom', room => {
            console.log(room)
            if (room && room.messages) {
                setmessages(room.messages)
            }
        })
        socket.on('chat-message', datamsg => {
            if (datamsg && datamsg.message) {
                setmessages(datamsg.message)
            }
        });
        if (roomId) {
            if (user && user.me && user.me.username) {
                socket.emit("join-room", roomId, user.me.username)
            }
            else {
                socket.emit("join-room-without-login", roomId)

            }
        }
    }, [])
    return (
        <div className="mx-auto">
            <section class="msger">
                <header class="msger-header">
                    <div class="msger-header-title">
                        <i class="fas fa-comment-alt"></i> Chat
</div>
                    <div class="msger-header-options">
                        <span><i class="fas fa-cog"></i></span>
                    </div>
                </header>

                <main class="msger-chat">

                    {
                        messages.map((x, i) => <div key={i} class="msg left-msg">
                            {/* <div
                          class="msg-img"
                      ></div> */}

                            <div class="msg-bubble">
                                <div class="msg-info">
                                    <div class="msg-info-name">{x.username ? x.username : ""}</div>
                                    {/* <div class="msg-info-time">{x.time?x.time:""}</div> */}
                                </div>

                                <div class="msg-text">
                                    {
                                        x.message ? x.message : ""
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }
                </main>

                <div class="msger-inputarea">
                    <input type="text" readOnly={user && user.me && user.me != null ? false : true} value={message} placeholder={user && user.me && user.me != null ? "Enter your message..." : "Please Login to comment"} onKeyPress={event => {
                        if (event.key === 'Enter') {
                            sendMsg()
                        }
                    }} onChange={(e) => setmessage(e.target.value)} class="msger-input" />
                    <button type="button" onClick={() => {
                        if (user && user.me && user.me != null)
                            sendMsg()

                    }} class="msger-send-btn">Send</button>
                </div>
            </section>
            {/* <div className="bg-success m-2 p-4 text-light">
                <h4 className="text-center">Chat Box coming soon....</h4>
            </div> */}
        </div>
    )
}


