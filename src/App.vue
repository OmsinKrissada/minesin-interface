<template>
	<div id="app">
		<NavBar v-if="this.$route.path != '/'" />
		<transition name="fade">
			<router-view class="view" />
		</transition>
	</div>
</template>


<script lang="ts">

import { Vue, Component } from "vue-property-decorator";

import NavBar from "@/components/NavBar.vue";

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

body {
	overflow: hidden; /* Hide scrollbars */
}

body::-webkit-scrollbar {
	width: 0rem;
}

#app {
	position: relative;
	display: flex;
	height: 100%;
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
	height: 20rem;
	width: 100vw;
}

.view {
	// position: relative;
	// width: eval(100vw - 20rem);
	// background-color: grey;
	width: 100%;
	height: 100vh;
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
