import { useEffect, useMemo, useRef, useState } from "react";
import { BACKEND_WS } from "../../routes/Websocket";
import WaitingRoom from "./WaitingRoom";
import ActionRoom from "./ActionRoom";
import { useSearchParams } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";
import {
  Message,
  RespCreateGame,
  RespSessionId,
} from "../../models/websocket/Response";
import { Code } from "../../models/websocket/Signal";
import { GameDifficulty, GridSize } from "../../models/websocket/Enums";
import { ReqCreateGame } from "../../models/websocket/Request";
import { Session } from "../../models/game/Session";

enum PageView {
  WAITING = 0,
  ACTION,
}

const GameAction = () => {
  const mounted = useRef(false);

  // Set up grid
  const [searchParams] = useSearchParams();
  const gridSize = Number(searchParams.get("gridSize"));
  const gridArr = useMemo(() => {
    const _arr: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      _arr.push(i);
    }

    return _arr;
  }, [gridSize]);

  // Session info
  const [session, setSession] = useState<Session | null>(null);
  const [gameUuid, setGameUuid] = useState<string>("");
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
        setSession({ ...session, ...newProperties });
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
      ws.onopen = (ev) => {
        console.log("Connected to ws backend", ev);

        const msgCreateGame = JSON.stringify({
          code: Code.CREATE_GAME,
          payload: { game_difficulty: gameDifficulty },
        } as Message<ReqCreateGame>);

        ws.send(msgCreateGame);
      };

      ws.onmessage = (event) => {
        const msg: Message<unknown> = JSON.parse(event.data);

        console.log(msg);
        console.log(msg.code);

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
            updateSession({
              game_uuid: p.game_uuid,
              player_uuid: p.player_uuid,
            });
            setGameUuid(p.game_uuid);
            break;
          }

          default:
            return;
        }
      };

      ws.onerror = (err) => {
        console.log("Error in ws conn:", err);
      };

      ws.onclose = (ev) => {
        console.log("Connection closed:", ev);
      };
    }
  }, [gameDifficulty, session, gameUuid]);

  if (gridSize === null) {
    return (
      <>
        Invalid Route! Please go back
        <BackMainMenu topMargin={divTopMargin.FOUR} />
      </>
    );
  }

  return (
    <div>
      {pageView === PageView.WAITING ? (
        <WaitingRoom gameUuid={gameUuid} />
      ) : (
        <ActionRoom gridArr={gridArr} />
      )}
    </div>
  );
};

export default GameAction;
