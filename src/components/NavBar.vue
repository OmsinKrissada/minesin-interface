<template>
	<span id="container">
		<!-- <div class="logo">
			<router-link to="/">MINESIN</router-link>
		</div> -->
		<router-link class="link" id="back-btn" to="/">
			<!-- <svg style="width: 1.5rem">
				<use xlink:href="@/assets/left-arrow.svg#Layer_1"></use>
			</svg> -->
			<p>Back</p>
		</router-link>
		<router-link class="link" to="/dashboard">
			<p>Dashboard</p>
		</router-link>
		<router-link class="link" to="/members">
			<p>Members</p>
		</router-link>
		<router-link class="link" to="/map">
			<p>DynMap</p>
		</router-link>
	</span>
</template>


<script lang="ts">

import { Vue, Component } from "vue-property-decorator";

// @Component
export default class NavBar extends Vue { }

</script>


<style scoped lang="scss">
#container {
	// padding: 30px;
	background-color: rgb(255, 255, 255);
	border-bottom: 1px solid grey;
	position: relative;
	width: 100vw;
	// margin-bottom: 20px;

	display: flex;
	// flex: 0 0 20rem;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);

	// .logo {
	// 	padding-top: 2.5rem;
	// 	padding-bottom: 2.5rem;
	// 	margin-bottom: 1.5rem;
	// 	width: 100%;
	// 	// margin-bottom: 3rem;
	// 	text-align: center;
	// 	border-bottom: 2px solid #ade8f4;

	// 	a {
	// 		font-family: "Raleway";
	// 		font-size: 3rem;
	// 		font-weight: 1000;
	// 		text-decoration: none;
	// 		color: #f1faee;
	// 	}
	// }

	.link {
		// background-color: green;
		display: inline-block;
		height: auto;

		margin: 10px;
		padding: 0 10px 0 10px;

		text-decoration: none;
		color: black;
		background-color: rgba(0, 0, 0, 0.001);

		border: 1.5px rgba(0, 0, 0, 0.2) solid;
		border-radius: 8px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

		transition: 0.25s;

		p {
			padding: 8px;
			font-family: "Quicksand", sans-serif;
			font-size: 1.2rem;
			font-weight: bold;
		}

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}

		&.router-link-exact-active {
			color: white;
			background-color: rgba(24, 151, 255, 0.9);
		}
	}

	#back-btn {
		margin-right: auto;
	}
}
</style>