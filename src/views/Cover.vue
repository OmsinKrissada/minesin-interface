<template>
	<div
		id="page"
		v-bind:style="{
			backgroundImage:
				'linear-gradient(to bottom,	rgba(0, 0, 0, 0.25),	rgba(0, 0, 0, 0.5)), url(' +
				image +
				')',
		}"
	>
		<div id="box">
			<h1 id="logo">MINESIN</h1>
			<h1>Welcome to my web dashboard, my friends.</h1>
			<form action="" @submit="authenticate">
				<input
					type="password"
					class="field"
					v-model="pass"
					placeholder="Passphrase"
					autocomplete="current-password"
					autofocus
				/>
				<button v-if="!sending" id="proceed-button" class="button">
					<p v-if="!sending">Proceed</p>
					<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
					<svg v-if="!sending">
						<use
							xlink:href="@/assets/right-arrow.svg#Layer_1"
						></use>
					</svg>
				</button>
				<pulse-loader :loading="sending"></pulse-loader>
			</form>
			<p id="error-text">
				{{ errortxt }}
			</p>
		</div>
	</div>
</template>


<script lang="ts">
import router from '@/router';
import { Options, Vue } from 'vue-class-component';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import axios, { AxiosError } from 'axios';

@Options({
	components: {
		PulseLoader
	}
})
export default class Cover extends Vue {
	pass = '';
	error = false;
	errortxt = '';
	sending = false;
	image = '';

	mounted() {
		this.image = require(`@/assets/bg/${Math.ceil(Math.random() * 21)}.png`);
	}

	authenticate(e: any) {
		const endpoint = localStorage.endpoint;
		if (this.sending) {
			e.preventDefault();
			return;
		} else if (this.pass == '') {
			e.preventDefault();
			this.errortxt = 'Passphrase cannot be empty';
			return;
		}

		this.sending = true;
		axios.post(endpoint + '/login', { passphrase: this.pass }, { timeoutErrorMessage: 'Time out!' }).then(res => {
			this.errortxt = '';
			localStorage.setItem('accessToken', res.data.accessToken);
			router.push('dashboard')
		}).catch((err: AxiosError) => {
			if (err.response?.status == 403)
				this.errortxt = 'Wrong Passphrase'
			else if (err.message == 'Network Error') {
				this.errortxt = 'Please check your internet connection, if problem persists, contact Omsin.'
			}
			else {
				console.error(err)
				this.errortxt = 'An error has occured: ' + err.message;
			}
		}).finally(() => this.sending = false)
		e.preventDefault()
	}
}


</script>


<style lang="scss" scoped>
.field {
	margin: 20px;
	padding: 0 10px 0 10px;

	appearance: none;
	border: none;
	outline: none;

	background: rgba(0, 0, 0, 0.3);
	border: 1px solid grey;
	border-radius: 8px;
	height: 2rem;
	font-size: 1rem;
	color: white;
}
#error-text {
	margin: 1rem;
	color: rgb(255, 106, 106);
}

// @function imgnum() {
// 	@return var(--img-num);
// }

$imgnum: var(--img-num);

#page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-size: cover;
	background-position: bottom;
	background-color: black;

	// transition: 0.5s;
}

#box {
	#logo {
		font-family: "MinecraftBig", Raleway;
		font-size: 4rem;
		font-weight: 100;
		color: antiquewhite;
	}
	h1 {
		font-family: "Raleway", Times, serif;
		font-size: 2rem;
		color: white;
		margin-bottom: 100px;
	}
}

#proceed-button {
	background-color: rgba(42, 214, 119, 0.61);

	display: flex;
	align-items: center;
	justify-content: space-evenly;

	margin: auto;
	width: 12.5rem;
	height: 3.125rem;

	border: 1px solid rgb(42, 214, 119);
	border-radius: 10px;

	text-decoration: none;
	transition: 0.25s;

	p {
		font-size: 1.5rem;
		font-family: "Quicksand", sans-serif, monospace;
		color: white;

		text-align: center;
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
		background-color: rgb(38, 189, 106);
	}

	&:focus {
		outline: none;
	}
}
</style>