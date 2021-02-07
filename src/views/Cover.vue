<template>
	<div id="page">
		<div id="box">
			<h1 id="logo">MINESIN</h1>
			<h1>Welcome to my web controller, my friend.</h1>
			<input
				type="password"
				class="field"
				v-model="pass"
				@keyup.enter="isCorrect"
				placeholder="Passphrase"
			/>
			<button @click="isCorrect" id="proceed-button" class="button">
				<p>Proceed</p>
				<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
				<svg>
					<use xlink:href="@/assets/right-arrow.svg#Layer_1"></use>
				</svg>
			</button>
			<p v-if="wrongPass" id="wrong-pass-text">Incorrect passphrase</p>
		</div>
	</div>
</template>


<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import Auth from '../auth'

@Component({})

export default class Cover extends Vue {
	pass = '';
	TOKEN = Auth.token;
	wrongPass = false;
	isCorrect() {
		if (this.pass === 'iamcool') {

			Auth.setToken('yayyyyy')
			// this.TOKEN = token;
			router.push('dashboard')
		} else this.wrongPass = true;
	}
}
// this.$router.push('dashboard')
// router.push('dashboard')

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
#wrong-pass-text {
	margin: 15px;
	color: rgb(255, 106, 106);
}
#page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0.75)
		),
		url("../assets/wallpaper.jpg");
	background-size: cover;
	background-position: bottom;
}

#box {
	h1 {
		font-family: "Raleway", Times, serif;
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
	width: 200px;
	height: 50px;

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