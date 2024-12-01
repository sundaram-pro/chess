import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./message";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null
    this.users = []
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
  }
  private handleMessage() {}

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if(message.type === INIT_GAME){
        if(this.pendingUser){
            const game = new Game(this.pendingUser, socket);
            this.games.push(game)
            this.pendingUser  = null
            //start game
        }else{
            this.pendingUser = socket; //user waiting to get connected
        }
      }

      if(message.type === MOVE){
        
      }
    });
  }
}
