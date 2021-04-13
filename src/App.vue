<template>
	<div id="app">
		<NavBar v-if="this.$route.path != '/'" />
		<router-view v-slot="{ Component }" class="view">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>


<script lang="ts">

import { Vue, Options } from 'vue-class-component'

import NavBar from "@/components/NavBar.vue";
import { endpoint } from './config.json';

@Options({
	components: {
		NavBar,
	},
})
export default class App extends Vue {
	created() {
		console.log(this.$route.path)
		localStorage.setItem('endpoint', endpoint)
	}
}

</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
@font-face {
	font-family: "MinecraftBig";
	src: url("assets/fonts/MinecraftBig.ttf") format("truetype");
}
@font-face {
	font-family: "Minecraftia";
	src: url("assets/fonts/Minecraftia.ttf") format("truetype");
}

* {
	margin: 0;
	font-size: 20px;
}

body {
	overflow: auto; /* Hide scrollbars */
}

body::-webkit-scrollbar {
	width: 0rem;
}

#app {
	position: relative;
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: flex-start;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	position: relative;
	/* height: 20rem; */
	width: 100vw;
}

.button {
	text-decoration: none;
	cursor: pointer;
	color: black;
	background-color: rgba(0, 0, 0, 0.001);

	border: 1.5px rgba(0, 0, 0, 0.2) solid;
	border-radius: 5px;

	transition: 0.25s;
}

.view {
	/* position: relative;
	width: eval(100vw - 20rem);
	background-color: grey; */
	width: 100%;
	flex-grow: 1;
	margin: 0rem;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
