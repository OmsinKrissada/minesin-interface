<template>
	<span id="container">
		<!-- <div class="logo">
			<router-link to="/">MINESIN</router-link>
		</div> -->
		<button v-on:click="logout" class="link button" id="back-btn">
			<!-- <svg style="width: 1.5rem">
				<use xlink:href="@/assets/left-arrow.svg#Layer_1"></use>
			</svg> -->
			<p>Logout</p>
		</button>
		<p id="logo">MINESIN</p>
		<router-link class="link button" to="/dashboard">
			<p>Dashboard</p>
		</router-link>
		<!-- <router-link class="link button" to="/members">
			<p>Members</p>
		</router-link> -->
		<router-link class="link button" to="/map">
			<p>DynMap</p>
		</router-link>
	</span>
</template>


<script lang="ts">

import { Options, Vue } from "vue-class-component";

@Options({})
export default class NavBar extends Vue {
	logout() {
		localStorage.removeItem('accessToken')
		console.log('logged out, cleared token')

		this.$router.push('/')
	}
}

</script>


<style scoped lang="scss">
#container {
	// padding: 30px;
	// background-color: hsl(210, 13%, 9%); // mine
	background-color: rgb(17, 24, 39); // ideal's
	// border-bottom: 2px solid rgba(128, 128, 128, 0.555);
	position: relative;
	// width: 100vw;
	// margin-bottom: 20px;

	display: flex;
	// flex: 0 0 20rem;
	justify-content: center;
	align-items: center;
	// box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);

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

	#back-btn {
		margin-right: auto;
		background-color: #75161e;
		color: white;
	}

	#logo {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -65%);

		color: rgba(255, 255, 255, 0.678);
		font-size: 45px;
		font-family: MinecraftBig;
	}

	.link {
		// background-color: green;
		display: inline-block;
		height: auto;

		margin: 10px;
		padding: 0 10px 0 10px;
		// box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);

		p {
			padding: 8px;
			font-family: "Quicksand", "Inter", sans-serif;
			font-size: 1.2rem;
			font-weight: bold;
			color: rgb(182, 182, 182);
		}

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
			box-shadow: 0px 0px 1.5px rgba(0, 0, 0, 0.3);
		}

		&.router-link-exact-active {
			color: white;
			background-color: #1b487a;
		}
	}

	@media only screen and (max-width: 768px) {
		.link {
			margin: 5px;
			p {
				font-size: 0.9rem;
			}
		}
	}
}
</style>