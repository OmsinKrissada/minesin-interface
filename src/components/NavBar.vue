<template>
	<nav>
		<span id="container">
			<div id="menu" tabindex="0">
				<button id="menu-icon" class="button">
					<img :src="skinURL" alt="user skin" width="50" />
				</button>
				<ul id="dropdown">
					<!-- <li class="link button droplink">
						<a>Change password</a>
					</li> -->
					<li
						v-on:click="changePassword"
						class="link button droplink"
					>
						<a>Change password</a>
					</li>
					<li v-on:click="logout" class="link button droplink">
						<a>Logout</a>
					</li>
				</ul>
			</div>
			<router-link class="link button" to="/dashboard">
				<p>Dashboard</p>
			</router-link>
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

	skinURL: string | null = null;

	changePassword() {
		alert('This feature will be implemented soon. Sorry for your disappointment :(');
	}

	logout() {
		localStorage.removeItem('accessToken');
		console.log('logged out, cleared token');

		this.$router.push('/');
	}

	mounted() {
		this.skinURL = localStorage.getItem('userSkinURL');
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

#menu {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	outline: none;

	margin: 10px;
	margin-right: auto;

	#menu-icon {
		padding: 0;

		filter: brightness(80%);

		img {
			border: 3px solid white;
			image-rendering: pixelated;
			border-radius: 3px;
		}
	}

	ul {
		/* Deactivated */
		visibility: hidden;
		opacity: 0;
		height: 0;

		position: absolute;
		top: 65px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 5px 2px;

		background-color: rgb(221, 221, 221);
		border: 3px solid rgb(87, 111, 131);
		border-radius: 5px;

		overflow: hidden;
		transition: 0.4s;

		.droplink {
			box-sizing: border-box;
			margin: 0px 10px;
			padding: 8px;

			width: 90%;
			border-radius: 0;
			border-bottom: 1px solid rgba(94, 105, 122, 0.534);

			font-family: "Inter", "Quicksand";
			font-size: 18px;
			text-align: left;

			&:last-child {
				border: 0;
				margin-top: 25px;
			}

			&:hover {
				color: rgb(30, 93, 211);
			}
		}
	}

	&:focus-within ul {
		/* Activated */
		visibility: visible;
		opacity: 1;
		height: 100px;
	}

	&:focus-within #menu-icon {
		filter: brightness(100%);
	}
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

	height: 70px; /* dont forget to also edit "top" property in ul of the dropdown */

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
			font-family: "Inter", sans-serif;
			font-size: 1rem;
			font-weight: 500;
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