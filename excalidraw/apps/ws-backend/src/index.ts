import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {

    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    let decoded: string | JwtPayload;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        ws.close();
        return;
    }

    if (typeof decoded === "string" || !decoded || !("userId" in decoded)) {
        ws.close();
        return;
    }

    ws.on('message', function message(data) {
        ws.send('pong');
    });
});
