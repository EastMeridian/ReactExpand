import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';
import { getCookie } from '../utils/cookies';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/user/actionCreators';

const withSocket = (Component) => (props) => {
  const [isConnected, setIsConnected] = useState(socket.isConnected());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.isConnected()) {
      const username = getCookie('username');
      socket.connect(username).then((user) => {
        dispatch(updateUser(user));
        setIsConnected(true);
        console.log('HHEEY');
      });
      socket.onGetUser((user) => dispatch(updateUser(user)));
    }
  }, [dispatch]);

  return (
    <>
      {isConnected && (
        <Component
          socket={socket}
          {...props}
        />
      )}
    </>
  );
}
export default withSocket;