import io from 'socket.io-client';
import uniqueID from 'lodash/uniqueId'
import { 
  GET_CHUNK, 
  GET_USER, 
  SEND_DATA,
  BUILD_BUILDING,
} from './messages';

const createSocket = ({ url }) => {
  let socket = null;

  return ({
    isConnected: () => socket && socket.connected,
    onGetUser: (fn) => {
      socket.on(GET_USER, (user) => {
        console.log(GET_USER, user)
        fn(user);
      });
    },
    connect: (username) => new Promise((resolve) => {
      socket = io(url, {
        query: { username },
      });

      socket.once(GET_USER, resolve);
      
      socket.on('connect', () => {
        console.log('Socket connected -----------------------------')
      });

      socket.on('discconnect', () => {
        console.log('Socket disconnected --------------------------')
      });
    }),
    getChunk: (position) => new Promise((resolve) => {
      const id = uniqueID();
      socket.once(`${GET_CHUNK}:${id}`, resolve);

      socket.emit(GET_CHUNK, { position, id });
    }),
    build: (village, building) => {
      socket.emit(BUILD_BUILDING, { village, building });
    }
  });
}

export default createSocket;
