import { TGrid, newGrid } from "./Grid";

enum PlayerMatchStatus {
  LOST = -1,
  UNDEFINED,
  WON,
}

class Player {
  uuid: string;
  is_turn: boolean;
  is_ready: boolean;
  is_host: boolean;
  match_status: number;
  sunken_ships: number;
  attack_grid: TGrid;
  defence_grid: TGrid;

  constructor(uuid: string, is_host: boolean, gridSize: number) {
    this.uuid = uuid;
    this.is_host = is_host;
    this.is_turn = this.is_host ? true : false;
    this.is_ready = false;
    this.match_status = PlayerMatchStatus.UNDEFINED;
    this.sunken_ships = 0;
    this.attack_grid = newGrid(gridSize);
    this.defence_grid = newGrid(gridSize);
  }
}
