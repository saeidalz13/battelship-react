// import { Code } from "../models/websocket/Signal";
// import {
//   Message,
//   RespCreateGame,
//   RespSessionId,
// } from "../models/websocket/Response";

// type TInvalidMsg = "invalidMsg";
// type TValidIncomingMessage = RespCreateGame | TInvalidMsg | string;

// const invalidMsg = "invalidMsg";

// export const handleIncomingMessage = (
//   event: MessageEvent,
//   ws: WebSocket
// ): TValidIncomingMessage => {
//   console.log(ws.OPEN);
//   const msg: Message<unknown> = JSON.parse(event.data);

//   if (!msg || !msg.code) {
//     console.error("Invalid message; JSON to contain 'code'");
//     return invalidMsg;
//   }

//   switch (msg.code) {
//     case Code.SESSION_ID: {
//       const p = msg.payload as RespSessionId;
//       return p.session_id;
//     }

//     case Code.CREATE_GAME: {
//       const p = msg.payload as RespCreateGame;
//       return p;
//     }

//     default:
//       console.error("invalid code");
//       return invalidMsg;
//   }
// };
