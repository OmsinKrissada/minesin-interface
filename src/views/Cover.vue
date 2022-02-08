<template>
	<div id="page">
		<div
			id="cover-image-next"
			class="cover-image"
			v-bind:style="{
				backgroundImage: 'linear-gradient(to bottom,	rgba(0, 0, 0, 0.25),	rgba(0, 0, 0, 0.5)), url(' + nextImage + ')'
			}"
		></div>
		<div
			id="cover-image-current"
			class="cover-image"
			v-bind:style="{
				backgroundImage: 'linear-gradient(to bottom,	rgba(0, 0, 0, 0.25),	rgba(0, 0, 0, 0.5)), url(' + image + ')',
				opacity: currentImgOpacity
			}"
		></div>
		<div id="box">
			<div id="head">
				<h1 id="logo">MINESIN</h1>
				<h1>Welcome, my friends.</h1>
			</div>
			<div id="login">
				<form action="" @submit="authenticate">
					<input type="text" class="field" v-model="user" placeholder="In-game name" autocomplete="username" autofocus />
					<input type="password" class="field" v-model="pass" placeholder="Password" autocomplete="current-password" />
					<div id="proceed-button-area">
						<button v-if="!sending" id="proceed-button" class="button">
							<p>Proceed</p>
							<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
							<svg>
								<use xlink:href="@/assets/right-arrow.svg#Layer_1"></use>
							</svg>
						</button>
						<pulse-loader :loading="sending" id="loader"></pulse-loader>
					</div>
				</form>
				<p id="error-text">
					{{ errortxt }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import config from "@/config.json";

import axios, { AxiosError } from "axios";

@Options({
	components: {
		PulseLoader
	}
})
export default class Cover extends Vue {
	user = "";
	pass = "";
	errortxt = "";
	sending = false;
	image = "";
	nextImage = "";
	currentImgOpacity = 1;
	imageInterval: number | undefined;

	randomCoverImage() {
		return require(`@/assets/bg/${Math.ceil(Math.random() * 21)}.jpg`);
	}

	mounted() {
		this.image = this.randomCoverImage();
		this.imageInterval = setInterval(() => {
			this.nextImage = this.randomCoverImage();
			this.currentImgOpacity = 0;

			setTimeout(() => {
				this.image = this.nextImage;
				this.currentImgOpacity = 1;
			}, 1000);
		}, 5000);
	}
	unmounted() {
		clearInterval(this.imageInterval);
	}

	authenticate(e: any) {
		const http_endpoint = config.http_endpoint;
		if (this.sending) {
			e.preventDefault();
			return;
		} else if (this.user == "" || this.pass == "") {
			e.preventDefault();
			this.errortxt = "Both fields are required";
			return;
		}

		this.sending = true;
		axios
			.post(http_endpoint + "/login", { username: this.user, password: this.pass }, { timeoutErrorMessage: "Time out!" })
			.then(res => {
				this.errortxt = "";
				localStorage.setItem("accessToken", res.data.accessToken);
				localStorage.setItem("userSkinURL", res.data.skinURL);
				router.push("dashboard");
			})
			.catch((err: AxiosError) => {
				if (err.response?.status == 401) this.errortxt = "Invalid username or password";
				else if (err.message == "Network Error") {
					this.errortxt = "Please check your internet connection.";
				} else {
					console.error(err);
					this.errortxt = "An error has occured: " + err.message;
				}
			})
			.finally(() => (this.sending = false));
		e.preventDefault();
	}
}
</script>

<style lang="scss" scoped>
// @function imgnum() {
// 	@return var(--img-num);
// }

$imgnum: var(--img-num);

#page {
	// box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: black;
}

.cover-image {
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;

	transition: 1s opacity;
}

#box {
	position: relative;
	box-sizing: border-box;
	z-index: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: rgba(107, 107, 107, 0.377);
	padding: 5vmin;
	max-width: 100vw;

	// width: clamp(200px, 50%, 600px);

	border: 1px solid rgba(151, 180, 173, 0.411);
	border-radius: 10px;
	backdrop-filter: blur(10px);

	#logo {
		font-family: "MinecraftBig", Raleway;
		font-size: 3.6rem;
		// font-size: clamp(0px, 4rem, 17vmin);
		font-weight: 100;
		text-shadow: 5px 5px 0px black;
		color: hsl(33, 100%, 86%);
	}
	h1 {
		font-family: "Minecraftia", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif, "Arial Narrow", Arial, sans-serif;
		font-size: 1.2rem;
		// font-size: clamp(0px, 1.5rem, 6vmin);
		font-weight: 100;
		text-shadow: 2px 3px 0px black;
		color: white;
		margin: 0px 0px 50px 0px;
	}
}

form {
	display: flex;
	flex-direction: column;
	align-items: center;

	margin: 20px 0;
}

.field {
	padding: 0 10px;
	margin: 3px 0;
	height: 2rem;
	max-width: 60vmin;

	appearance: none;
	border: none;
	outline: none;

	background: rgba(0, 0, 0, 0.3);
	border: 2px solid grey;
	border-radius: 8px;
	font-size: 0.9rem;
	font-family: "Inter";
	color: rgb(179, 179, 179);

	transition: 0.2s;

	&:focus {
		border-color: hsl(199, 62%, 45%);
		box-shadow: 0px 0px 8px hsla(199, 62%, 45%, 0.726);
		color: white;
	}

	&:hover {
		border-color: hsl(199, 62%, 45%);
	}
}

#proceed-button-area {
	margin-top: 20px;
	width: 12.5rem;
	max-width: 70vmin;
	height: 3.125rem;
}

#proceed-button {
	background-color: rgba(42, 192, 109, 0.61);

	display: flex;
	align-items: center;
	justify-content: space-evenly;

	width: 100%;
	height: 100%;

	border: 1px solid rgb(42, 214, 119);
	border-radius: 10px;

	text-decoration: none;
	transition: 0.25s;

	p {
		font-size: 1.5rem;
		font-family: "Inter", sans-serif, monospace;
		color: white;
	}

	svg {
		height: 45%;
		width: 25px;
		fill: white;
		path {
			position: relative;
			width: 50%;
		}
	}

	&:hover {
		background-color: rgb(35, 167, 94);
		box-shadow: 0px 0px 10px hsl(147, 68%, 20%);
	}

	&:focus {
		outline: none;
	}
}

#loader {
	margin-top: 15px;
}

#error-text {
	text-shadow: 1px 1px 0px black;
	color: rgb(255, 106, 106);
	font-size: 18px;
}

@media only screen and (max-width: 800px) {
	#box {
		#logo {
			font-size: 3rem;
		}
		h1 {
			padding: 20px;
			margin: 0;
			font-size: 1rem;
		}

		#login {
			margin: 25px;
		}

		#field {
			height: 1.8rem;
			font-size: 0.75rem;
		}

		#proceed-button-area {
			width: 10rem;
			height: 2.5rem;
			p {
				font-size: 1.2rem;
			}
		}
	}
}

@media only screen and (max-width: 800px) and (orientation: landscape) {
	#box {
		flex-direction: row;
	}
}
</style>
