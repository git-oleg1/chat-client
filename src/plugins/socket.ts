import { Socket, io } from 'socket.io-client';
import { reactive, type App } from 'vue'

export class SocketService {
  readonly socket!: Socket;

  state = reactive({
    connected: false,
  });

  constructor(readonly url: string) {
    this.socket = io(url);

    this.socket.on("connect", () => {
      this.state.connected = true;
    });

    this.socket.on("disconnect", () => {
      this.state.connected = false;
    });
  }


}

function createSocket(options: Record<string, any>): [{ install: (app: App) => void }, SocketService] {
  const socketService = new SocketService(options.url);
  return [
    {
      install(app: App) {
        app.config.globalProperties.$socket = socketService
      }
    },
    socketService,
  ];
}

const [ plugin, service ] = createSocket({
  url: 'http://localhost:3000/chat'
});

export function useSocket() {
  return service;
}

export default plugin;
