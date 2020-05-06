import createSocket from '../socket/createSocket';

const socket = createSocket({ url: 'http://localhost:8080' });

export default socket;