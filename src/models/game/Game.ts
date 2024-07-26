export class Game {
  private uuid: string;
  private mode: number;
  private gridSize: number;

  constructor(uuid: string, mode: number, gridSize: number) {
    this.uuid = uuid;
    this.mode = mode;
    this.gridSize = gridSize;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getMode(): number {
    return this.mode;
  }
  public getGridSize(): number {
    return this.gridSize;
  }
}

export enum GameDifficulty {
  Easy = 0,
  Normal,
  Hard,
}
