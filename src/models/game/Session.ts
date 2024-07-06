export class Session {
  id: string;
  game_uuid: string;

  constructor(id: string) {
    this.id = id;
    this.game_uuid = "";
  }
}
