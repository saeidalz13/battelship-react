export interface RespSessionId {
  session_id: string;
}

export interface RespCreateGame {
  game_uuid: string;
  player_uuid: string;
}

export interface RespJoinGame {
  game_uuid: string;
  player_uuid: string;
  game_difficulty: number;
  game_mode: number;
}
