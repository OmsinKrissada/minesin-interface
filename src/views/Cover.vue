<template>
	<body>
		<header>
			<p id="total_online">Unknown Error Occurs</p>
			<nav>
				<!-- <a class="nav-item" id="home-menu">Home</a> -->
				<a id="members-menu">Members</a>
				<router-link to="/chat" id="chat-menu">Chat</router-link>
			</nav>
			<!-- <img style="position: absolute; min-width: 100vw;"
			src="https://cdnb.artstation.com/p/assets/images/images/006/218/177/large/julian-fischer-29-01-17-pano.jpg?1496870057"> -->
			<h1 id="logo">MINESIN</h1>
		</header>

		<div class="main_box">
			<div class="server-div">
				<p>Lobby</p>
				<p>Online: 0</p>
			</div>
			<div class="server-div">
				<p>Survival</p>
				<p>Online: 4</p>
				<div class="player-div">
					<img
						class="player-avatar"
						src="https://minotar.net/avatar/Kong/100"
						alt="avatar-img"
					/>
					<p class="player-name">Kong</p>
				</div>
				<div class="player-div">
					<img
						class="player-avatar"
						src="https://minotar.net/avatar/ossi/100"
						alt="avatar-img"
					/>
					<p class="player-name">ossi</p>
				</div>
				<div class="player-div">
					<img
						class="player-avatar"
						src="https://minotar.net/avatar/v0idweaver/100"
						alt="avatar-img"
					/>
					<p class="player-name">Ideal</p>
				</div>
				<div class="player-div">
					<img
						class="player-avatar"
						src="https://minotar.net/avatar/Aden_MarkaitoO/100"
						alt="avatar-img"
					/>
					<p class="player-name">Aden_MarkaitoO</p>
				</div>
			</div>
			<div class="server-div">
				<p>Missile Wars</p>
				<p>Online: 0</p>
			</div>
			<div class="server-div">
				<p>Maps</p>
				<p>Online: 0</p>
			</div>
		</div>

		<div>
			<h3>Proceed to advanced mode</h3>
		</div>

		<footer>
			<p>&copy; 2020 Krissada Singhakachain</p>
			<p>Github: OmsinKrissada</p>
		</footer>
	</body>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default class Cover extends Vue {}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
@font-face {
	font-family: "Minecraftia";
	src: url("../assets/Minecraftia-Regular.ttf") format("truetype");
}

* {
	margin: 0;
	font-size: 22px;
}

body::-webkit-scrollbar {
	width: 0rem;
}

header {
	/* background-color: rgb(230, 230, 230); */
	background-image: linear-gradient(
			rgba(106, 118, 133, 0.533),
			rgba(130, 165, 182, 0.533)
		),
		url("https://i.redd.it/qfugixhm1wv01.png");
	background-size: cover;
	background-position: center;
	display: flex;
	height: 20rem;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

#logo {
	/* position: relative; */
	font-size: 5rem;
	font-weight: 100;
	font-family: "Raleway", sans-serif;
	color: white;
	cursor: default;
}

nav {
	/* background-color: aqua; */
	position: absolute;
	width: 100%;
	top: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	a {
		/* background-color: aliceblue; */
		font-family: "Quicksand", sans-serif;
		text-decoration: none;
		color: #ffffff;
		margin: 1rem;
		padding: 0.25rem;
		cursor: pointer;
		border-bottom: 0px;
		border-bottom: 2px solid transparent;
		transition: border 200ms ease;

		&:hover {
			border-bottom: 2px solid hsl(0, 0%, 65%);
		}
	}
}

.selected-btn {
	border-bottom: 2px solid hsl(0, 0%, 80%);

	&:hover {
		border-bottom: 2px solid hsl(0, 0%, 80%);
	}
}

#total_online {
	position: absolute;
	left: 0;
	top: 0;
	margin: 1rem;
	font-family: "Quicksand", sans-serif;
	font-weight: bold;
	color: rgb(200, 200, 200);
}

/* #total_online {
	position: absolute;
	font-size: 0.8rem;
	top:1rem;
	left:1rem;
	font-family: 'Quicksand', sans-serif;
} */

.main_box {
	background-color: whitesmoke;
	border-radius: 10px;
	position: relative;
	margin: auto;
	/* margin-left: 10vw;
	margin-right: 10vw; */
	padding: 3rem;
	top: 2rem;
	width: 65rem;
	max-width: 80vw;
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
	height: min-content;
}

.server-div {
	background-color: hsl(0, 0%, 90%);
	border-radius: 15px;
	/* margin: 1rem; */
	height: auto;
	min-width: 12rem;
	font-family: Arial, Helvetica, sans-serif;
	text-align: center;
}

.player-div {
	height: 3rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.player-avatar {
	margin: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
}

.player-name {
	margin: 0.5rem;
	padding-top: 0.5rem;
	font-family: "Minecraftia", sans-serif;
	font-size: 0.8rem;
}

footer {
	position: relative;
	bottom: 0;
	margin-top: 3rem;
	width: 100vw;
	height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 2px solid hsl(0, 0%, 90%);
	font-family: Quicksand, Tahoma, sans-serif;
	color: hsl(0, 0%, 50%);

	p {
		margin-left: 1rem;
		margin-right: 1rem;
		font-size: 0.8rem;
	}
}

@media only screen and (max-width: 80rem) {
	.main_box {
		flex-direction: column;
		align-items: center;
		width: auto;
		max-width: auto;
	}
	.server-div {
		max-width: max-content;
		margin: 1rem;
	}
}
</style>
