import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Message from '../Message/Message';
import Loader from '../Loader/Loader';

import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const MessageList = ({ getMessages, message: { messages, isLoading, error } }) => {
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="message-list mx-auto p-5">
      <h2>Comments:</h2>
      {error && <div className="error-center">{error}</div>}
      <div className="list">
        {isLoading ? (
          <Loader />
        ) : (
            <>
              {messages.map((message, index) => {
                return <Message key={index} className="comment" message={message} />;
              })}
            </>
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { getMessages })(MessageList);
