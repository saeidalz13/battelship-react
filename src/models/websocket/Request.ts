import { GameDifficulty } from "./Enums";

export interface ReqCreateGame {
  game_difficulty: GameDifficulty;
}

export interface ReqJoinGame {
  game_uuid: string;
}
