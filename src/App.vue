<template>
	<div id="app">
		<NavBar />
		<router-view class="view" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
// import socket from "./socket";
import socketio from "socket.io-client";
console.log("Hello! Outside");

const socket = socketio.io("ws://omsinkrissada.sytes.net/", {
	secure: true,
	// forceNew: true,
	// autoConnect: true,
	transports: ["websocket"],
	// timeout: 100000,
});

socket.on("connect", (data: string) => {
	console.log('yay')
	console.log(`received as ${data}`);
});

socket.on("ping", function (data: string) {
	socket.emit("pong", { beat: 1 });
});

export default class App extends Vue {
	// created() {}
}
</script>

<style scoped lang="scss">
* {
	margin: 0;
	// font-size: 16px;
}

.view {
	position: relative;
	// width: eval(100vw - 20rem);
	// background-color: grey;
}

#app {
	position: relative;
	display: flex;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
