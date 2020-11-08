<template>
	<div id="nav">
		<div class="logo">
			<router-link to="/">MINESIN</router-link>
		</div>
		<router-link class="link" to="/dashboard">
			<p>Dashboard</p>
		</router-link>
		<router-link class="link" to="/members">
			<p>Members</p>
		</router-link>
		<router-link class="link" to="/chat">
			<p>Chat</p>
		</router-link>
		<router-link class="link" to="/map">
			<p>Map</p>
		</router-link>
	</div>
</template>


<script lang="ts">

import { Vue, Component } from "vue-property-decorator";

// @Component
export default class NavBar extends Vue { }

</script>


<style scoped lang="scss">
#nav {
	// padding: 30px;
	background-color: whitesmoke;
	position: relative;
	height: 100vh;

	display: flex;
	flex: 0 0 25rem;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.logo {
		padding-top: 2.5rem;
		padding-bottom: 2.5rem;
		width: 100%;
		// margin-bottom: 3rem;
		text-align: center;
		border-bottom: 2px solid white;

		a {
			font-family: "Raleway";
			font-size: 3rem;
			font-weight: 1000;
			text-decoration: none;
			color: goldenrod;
		}
	}

	.link {
		// background-color: green;
		height: 4rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		text-decoration: none;
		// padding: 3rem;

		p {
			font-family: "Quicksand", sans-serif;
			font-size: 1.5rem;
			color: #2c3e50;
		}
		&.router-link-exact-active {
			background-color: grey;
		}
	}
}
</style>