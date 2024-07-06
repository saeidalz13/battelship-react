interface Error {
  error_details: string;
  message: string;
}

export interface Message<T> {
  code: number;
  payload?: T;
  error?: Error;
}

export interface RespSessionId {
    session_id: string
}

export interface RespCreateGame {
    game_uuid: string;
    player_uuid: string;
}