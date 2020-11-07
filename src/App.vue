<template>
	<div id="app">
		<NavBar />
		<router-view class="view" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
	components: {
		NavBar,
	},
})
export default class App extends Vue {
	created() {
		console.log("Hello!");
	}
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
