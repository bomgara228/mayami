import { WebSocket } from "ws";
import {createInterface} from "readline";

const readline = createInterface({
    input: process.stdin,
});
let clientname  ;
function startWebsocket(){
    const socket = new WebSocket('ws:/localhost:3000/chat');
    socket.on('open',function() {
        console.log(`What is your name?`);
        let i = 0;
        readline.on('line', (YOURNAME)=>{
            if (i == 0){clientname = YOURNAME; i++; console.log(i);} else {
                socket.send(`${clientname}:${YOURNAME}`);
            }
            
        })
    });

    socket.on('message',function(message){
        console.log(message.toString());
    });
    
}
startWebsocket();
