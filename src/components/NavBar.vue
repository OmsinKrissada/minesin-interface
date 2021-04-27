<template>
	<nav>
		<span id="container">
			<!-- <div class="logo">
			<router-link to="/">MINESIN</router-link>
		</div> -->
			<img
				src="@/assets/icon/menu.svg"
				id="menu-icon"
				style="visibility: hidden; position: absolute"
				alt=""
			/>
			<button v-on:click="logout" class="link button" id="back-btn">
				<!-- <svg style="width: 1.5rem">
				<use xlink:href="@/assets/left-arrow.svg#Layer_1"></use>
			</svg> -->
				<p>Logout</p>
			</button>
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
		<p id="logo">MINESIN</p>
	</nav>
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
nav {
	// position: sticky;
	// top: 0%;
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	flex-grow: 0;
}

#logo {
	position: absolute;
	left: 50%;
	transform: translate(-50%, -15%);

	color: rgba(255, 255, 255, 0.678);
	font-size: 45px;
	font-family: MinecraftBig;
}

#container {
	// padding: 30px;
	// background-color: hsl(210, 13%, 9%); // mine
	background-color: rgb(17, 24, 39); // ideal's
	// border-bottom: 2px solid rgba(128, 128, 128, 0.555);
	border: 0;
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	#back-btn {
		margin-right: auto;
		background-color: #75161e;
		color: white;
	}

	.link {
		// background-color: green;
		display: inline-block;
		height: auto;

		margin: 10px;
		padding: 0 10px 0 10px;
		border: 0;
		// box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);

		p {
			padding: 8px;
			font-family: "Quicksand", "Inter", sans-serif;
			font-size: 1.2rem;
			font-weight: bold;
			color: rgb(182, 182, 182);
		}

		&:hover {
			background-color: #3995ff1c;
			box-shadow: 0px 0px 1.5px rgba(0, 0, 0, 0.3);
		}

		&.router-link-exact-active {
			color: white;
			background-color: #1b487a;
		}
	}
}

@media only screen and (max-width: 768px) {
	// #menu-icon {
	// 	visibility: visible;
	// 	position: relative;
	// 	color: white;
	// }
	#logo {
		display: none;
	}
	#container .link {
		margin: 5px;
		p {
			font-size: 0.9rem;
		}
	}
}
</style>