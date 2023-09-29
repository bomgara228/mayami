import { WebSocketServer } from "ws";
import {createInterface} from "readline";
const PORT = 3000

const readline = createInterface({
    input: process.stdin,
});
let clients = [];
const server = new WebSocketServer({port: PORT, path: '/chat'});

server.on('connection', (clientSocket) => {
    clients.push(clientSocket);
    clientSocket.on('message', (data) => {
        sendMessageToAllClients(data.toString());
        console.log(data.toString());
        console.log('che');
    })
})


server.on('listening', ()=>{
    console.log(`Let's chat!`)
});

function sendMessageToAllClients(data) {
    clients.forEach((client) => {
        client.send(data.toString());
    })
}