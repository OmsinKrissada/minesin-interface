<template>
	<div id="nav">
		<div class="logo">
			<router-link to="/">MINESIN</router-link>
		</div>
		<router-link class="link" to="/dashboard">
			<!-- <img src="@/assets/map-icon.png" width="auto" height="50 rem" /> -->
			<p>Dashboard</p>
		</router-link>
		<router-link class="link" to="/members">
			<!-- <img src="@/assets/map-icon.png" width="auto" height="50 rem" /> -->
			<p>Members</p>
		</router-link>
		<!-- <router-link class="link" to="/chat">
			<img src="@/assets/map-icon.png" width="auto" height="50 rem" />
			<p>Chat</p>
		</router-link> -->
		<router-link class="link" to="/map">
			<!-- <img src="@/assets/map-icon.png" width="auto" height="50 rem" /> -->
			<p>Map</p>
		</router-link>
	</div>
</template>


<script lang="ts">

import { Vue, Component } from "vue-property-decorator";

// @Component
// export default class NavBar extends Vue { }

</script>


<style scoped lang="scss">
#nav {
	// padding: 30px;
	background-color: #1d3557;
	position: relative;
	height: 100vh;

	display: flex;
	flex: 0 0 20rem;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-right: 1px solid #f1faee;

	.logo {
		padding-top: 2.5rem;
		padding-bottom: 2.5rem;
		margin-bottom: 1.5rem;
		width: 100%;
		// margin-bottom: 3rem;
		text-align: center;
		border-bottom: 2px solid #ade8f4;

		a {
			font-family: "Raleway";
			font-size: 3rem;
			font-weight: 1000;
			text-decoration: none;
			color: #f1faee;
		}
	}

	.link {
		// background-color: green;
		height: 4rem;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		text-decoration: none;
		// padding: 3rem;

		img {
			margin-left: 3rem;
			margin-right: 2rem;
		}

		p {
			margin-top: 1rem;
			font-family: "Minecraftia", sans-serif;
			font-size: 1.4rem;
			// font-weight: bold;
			color: #a8dadc;
		}
		&.router-link-exact-active {
			background-color: #0077b6;
		}
	}
}
</style>