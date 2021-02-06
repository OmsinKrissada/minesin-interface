<template>
	<div id="page">
		<div id="box">
			<h1>Welcome to my web controller, my friend.</h1>
			<router-link to="/dashboard" id="proceed-button">
				<p>Proceed</p>
				<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
				<svg>
					<use xlink:href="@/assets/right-arrow.svg#Layer_1"></use>
				</svg>
			</router-link>
		</div>
	</div>
</template>


<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})

export default class Cover extends Vue { }
</script>


<style lang="scss" scoped>
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
	padding: 15px;
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
}
</style>