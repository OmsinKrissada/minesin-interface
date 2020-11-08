// import { io } from "socket.io-client";

// const socket = io({
//   secure: true,
//   // forceNew: true,
//   autoConnect: true,
//   transports:['polling','websocket']
  
// });
// console.log('Created socket')

// socket.on("connected", (data: string) => {
//   console.log("received");
//   console.log(data);
// });

// socket.on('ping', (data:string)=>{
//   socket.emit('pong', {beat: 1});
// });

// export default socket;