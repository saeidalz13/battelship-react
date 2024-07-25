export class Session {
  id: string;
  gameUuid: string;
  playerUuid: string;
  gridSize: number;
  gameMode: number;

  constructor(id: string) {
    this.id = id;
    this.gameUuid = "";
    this.playerUuid = "";
    this.gridSize = -1;
    this.gameMode = -1;
  }
}
