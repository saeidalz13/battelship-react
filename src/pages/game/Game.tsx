import { useEffect, useMemo, useRef, useState } from "react";
import { BACKEND_WS } from "../../routes/Websocket";
import WaitingRoom from "./WaitingRoom";
import ActionRoom from "./ActionRoom";
import { useSearchParams } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";
import {
  RespCreateGame,
  RespJoinGame,
  RespSessionId,
} from "../../models/websocket/Response";
import { Code } from "../../models/websocket/Signal";
import { WebSocketCloseCodes } from "../../models/websocket/Enums";
import { ReqCreateGame, ReqJoinGame } from "../../models/websocket/Request";
import { Session } from "../../models/game/Session";
import { Message } from "../../models/websocket/Message";
import { GridSize } from "../../models/game/Grid";
import { Game, GameDifficulty } from "../../models/game/Game";
import { Player } from "../../models/game/Player";

enum PageView {
  WAITING = 0,
  SELECT_GRID,
  ACTION,
}

const GameAction = () => {
  const mounted = useRef(false);

  // Search the url params
  const [searchParams] = useSearchParams();
  const gridSizeParams = Number(searchParams.get("gridSize"));
  const isHost = Boolean(searchParams.get("isHost"));
  const joinGameUuid = searchParams.get("joinGameUuid");

  // use state
  const [gridSize, setGridSize] = useState<number>(gridSizeParams);

  const gridArr = useMemo(() => {
    const _arr: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      _arr.push(i);
    }

    return _arr;
  }, [gridSize]);

  // Session info
  const [wsConn, setWsConn] = useState<WebSocket | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [pageView, setPageView] = useState<PageView>(PageView.WAITING);

  const gameDifficulty = useMemo(() => {
    switch (gridSize) {
      case GridSize.EASY:
        return GameDifficulty.Easy;
      case GridSize.NORMAL:
        return GameDifficulty.Normal;
      case GridSize.HARD:
        return GameDifficulty.Hard;
      default:
        return -1;
    }
  }, [gridSize]);

  useEffect(() => {
    const updateSession = (newProperties: Partial<Session>) => {
      if (session) {
        const updatedSession = new Session(session.getId());
        if (newProperties.player)
          updatedSession.setPlayer(newProperties.player);
        if (newProperties.game) updatedSession.setGame(newProperties.game);
        setSession(updatedSession);
      }
    };

    if (!mounted.current) {
      mounted.current = true;
      if (!BACKEND_WS) {
        console.log("URL for ws is not valid");
        return;
      }

      // * Notes:
      // 1. if web page reloaded, ws gets disconnected (1001 code; going away)

      const ws = new WebSocket(BACKEND_WS);
      setWsConn(ws);
      ws.onopen = (ev) => {
        console.log("Connected to ws backend", ev);

        if (isHost) {
          const msgCreateGame = JSON.stringify({
            code: Code.CREATE_GAME,
            payload: { game_difficulty: gameDifficulty },
          } as Message<ReqCreateGame>);

          ws.send(msgCreateGame);
        } else {
          const msgJoinGame = JSON.stringify({
            code: Code.JOIN_GAME,
            payload: { game_uuid: joinGameUuid },
          } as Message<ReqJoinGame>);

          ws.send(msgJoinGame);
        }
      };

      ws.onmessage = (event) => {
        const msg: Message<unknown> = JSON.parse(event.data);

        if (msg.code === null || msg.code === undefined) {
          console.error("Invalid type of incoming message");
          return;
        }

        switch (msg.code) {
          case Code.SESSION_ID: {
            const p = msg.payload as RespSessionId;
            setSession(new Session(p.session_id));
            break;
          }

          case Code.CREATE_GAME: {
            const p = msg.payload as RespCreateGame;
            const _game = new Game(p.game_uuid, gameDifficulty, gridSize);
            const _player = new Player(p.player_uuid, true, gridSize);

            updateSession({
              game: _game,
              player: _player,
            });
            break;
          }

          case Code.JOIN_GAME: {
            const p = msg.payload as RespJoinGame;
            if (joinGameUuid) {
              let _gs = -1;
              switch (p.game_difficulty) {
                case GameDifficulty.Easy:
                  setGridSize(GridSize.EASY);
                  _gs = GridSize.EASY;
                  break;
                case GameDifficulty.Normal:
                  setGridSize(GridSize.NORMAL);
                  _gs = GridSize.NORMAL;
                  break;
                case GameDifficulty.Hard:
                  setGridSize(GridSize.HARD);
                  _gs = GridSize.HARD;
                  break;

                default:
                  alert("Server error! Try again later");
              }
              const _game = new Game(p.game_uuid, p.game_difficulty, _gs);
              const _player = new Player(p.player_uuid, false, _gs);

              updateSession({
                game: _game,
                player: _player,
              });

            } else {
              alert("Invalid game uuid");
            }

            break;
          }

          case Code.SELECT_GRID: {
            setPageView(PageView.SELECT_GRID);
            break;
          }

          default:
            console.log("Invalid code in message:", msg.code);
            return;
        }
      };

      ws.onerror = (err) => {
        console.log("Error in ws conn:", err);
      };

      ws.onclose = (event) => {
        if (event.code === WebSocketCloseCodes.ABNORMAL_CLOSURE) {
          alert(`Connection closed: ${event.code}`);
        }
      };
    }
  }, [gameDifficulty, session, isHost, joinGameUuid, gridSize]);

  // Meaning the host came to this page
  // but no grid size was provided
  if (gridSize === null && !isHost) {
    return (
      <>
        Invalid Route! Please go back
        {alert("Invalid page! Go back to menu please")}
        <BackMainMenu topMargin={divTopMargin.FOUR} />
      </>
    );
  }

  return (
    <div>
      {pageView === PageView.WAITING && isHost && session && session.game ? (
        <WaitingRoom gameUuid={session.game.getUuid()} wsConn={wsConn} />
      ) : (
        <ActionRoom gridArr={gridArr} />
      )}
    </div>
  );
};

export default GameAction;
