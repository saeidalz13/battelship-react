export class Session {
  id: string;
  game_uuid: string;
  player_uuid: string;

  constructor(id: string) {
    this.id = id;
    this.game_uuid = "";
    this.player_uuid = "";
  }
}
