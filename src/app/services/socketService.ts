import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';

const socket = io.connect(environment.API_SERVER);
class SocketService {
  static emit(key, data) {
    socket.emit(key, data);
  }

  static get socket() {
    return socket;
  }
}

export default SocketService;