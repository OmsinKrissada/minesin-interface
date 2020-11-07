<template>
	<div id="nav">
		<router-link to="/">Dashboard</router-link>
		<router-link to="/members">Members</router-link>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>

<style scoped lang="scss">
#nav {
	// padding: 30px;
	background-color: aquamarine;
	position: relative;
	display: flex;
	width: 20rem;
	height: 100vh;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>