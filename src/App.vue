<template>
	<div id="app">
		<NavBar v-if="this.$route.path != '/'" />
		<router-view class="view" />
	</div>
</template>


<script lang="ts">

import { Vue, Component } from "vue-property-decorator";

import NavBar from "@/components/NavBar.vue";
import socketio from "socket.io-client";

console.log("Hello! Outside");

const socket = socketio.io("/", {
	secure: true,
	// forceNew: true,
	// autoConnect: true,
	transports: ["websocket"],
	// timeout: 100000,
});

socket.on("connect", (data: string) => {
	console.log("yay");
	console.log(`received as ${data}`);
});

socket.on("ping", function (data: string) {
	socket.emit("pong", { beat: 1 });
});

@Component({
	components: {
		NavBar,
	},
})

export default class App extends Vue {
	created() {
		console.log(this.$route.path)
	}
}

</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");

* {
	margin: 0;
	// font-size: 16px;
}

#app {
	position: relative;
	display: flex;
	justify-content: flex-start;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.view {
	// position: relative;
	// width: eval(100vw - 20rem);
	// background-color: grey;
	width: 100%;
	margin: 1rem;
}
</style>
