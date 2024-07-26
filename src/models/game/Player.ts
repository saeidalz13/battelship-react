import { TGrid, newGrid } from "./Grid";

enum PlayerMatchStatus {
  LOST = -1,
  UNDEFINED,
  WON,
}

export class Player {
  private uuid: string;
  isTurn: boolean;
  isReady: boolean;
  isHost: boolean;
  private matchStatus: number;
  sunkenShips: number;
  attackGrid: TGrid;
  defenceGrid: TGrid;

  constructor(uuid: string, isHost: boolean, gridSize: number) {
    this.uuid = uuid;
    this.isHost = isHost;
    this.isTurn = this.isHost ? true : false;
    this.isReady = false;
    this.matchStatus = PlayerMatchStatus.UNDEFINED;
    this.sunkenShips = 0;
    this.attackGrid = newGrid(gridSize);
    this.defenceGrid = newGrid(gridSize);
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getMatchStatus(): number {
    return this.matchStatus;
  }
}
