<template>
	<div id="app" tabindex="0">
		<NavBar v-if="this.$route.path != '/'" />
		<router-view v-slot="{ Component }" class="view">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>


<script lang="ts">

import { Vue, Options } from 'vue-class-component';

import NavBar from "@/components/NavBar.vue";
import { http_endpoint } from './config.json';

@Options({
	components: {
		NavBar,
	},
})
export default class App extends Vue {
	created() {
		console.log(this.$route.path);
		localStorage.setItem('endpoint', http_endpoint);
	}
}

</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
@import url("https://rsms.me/inter/inter.css");
@font-face {
	font-family: "MinecraftBig";
	src: url("assets/fonts/MinecraftBig.ttf") format("truetype");
}
@font-face {
	font-family: "Minecraftia";
	src: url("assets/fonts/Minecraftia.ttf") format("truetype");
}

:root {
	font-size: 20px;

	/* font-size: 2vmin; */
}

* {
	margin: 0;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/* body::-webkit-scrollbar {
	width: 0rem;
} */

#app {
	position: relative;
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: flex-start;
	font-family: Avenir, Helvetica, Arial, sans-serif;
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
	outline: none;

	transition: 0.2s;
}

.view {
	/* position: relative;
	width: eval(100vw - 20rem);
	background-color: grey; */
	width: 100%;
	flex-grow: 1;
	margin: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
