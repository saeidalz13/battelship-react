import { Code } from "../models/websocket/Signal";
import { Message, RespSessionId } from "../models/websocket/response";

export const handleIncomingMessage = (msg: Message<unknown>) => {
    switch (msg.code) {
        case Code.SESSION_ID:{
            const p = msg.payload as RespSessionId;
            break
        }
        default:
            console.error("invalid code")
    }
} 