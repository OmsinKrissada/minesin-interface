import { io } from "socket.io-client";

const socket = io(":8080/", {
  path: "/socket.io",
});

socket.on("connected", (data: string) => {
  console.log("received");
  console.log(data);
});
