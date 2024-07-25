import { Game } from "./Game";
import { Player } from "./Player";

export class Session {
  private id: string;
  public player: Player | null;
  public game: Game | null;

  constructor(id: string) {
    this.id = id;
    this.player = null;
    this.game = null;
  }

  public getId(): string {
    return this.id;
  }

  public setPlayer(player: Player | null) {
    this.player = player;
  }

  public setGame(game: Game | null) {
    this.game = game;
  }
}
