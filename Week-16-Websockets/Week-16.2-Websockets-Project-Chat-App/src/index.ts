import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface Users{
    socket: WebSocket;
    room: string;
}

let allSockets: Users[] = [];

wss.on('connection', (socket) => {


    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());

        if (parsedMessage.type === 'join') {
            allSockets.push({ 
                socket, 
                room: parsedMessage.payload.roomId
            });
            console.log("User joined room: " + parsedMessage.room);
        }

        if (parsedMessage.type === 'chat') {
            //const currentUserRoom = allSockets.find(x => x.socket === socket);
            let currentUserRoom = null;

            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket === socket) {
                    currentUserRoom = allSockets[i].room;
                }
            }

            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room === currentUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }

    });

    socket.on("Disconnect", () => {
        allSockets = allSockets.filter(x => x.socket !== socket);
        console.log("User disconnected")
    })
})