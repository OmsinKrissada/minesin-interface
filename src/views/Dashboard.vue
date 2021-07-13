<template>
	<div class="dashboard">
		<transition name="fade" mode="out-in" tag="div">
			<div id="connection-banner" v-if="connectionErrorText.length > 0">
				<div id="connection-banner-box">
					<ring-loader color="#FFFFFF" class="loader"></ring-loader>
					<p>{{ connectionErrorText }}</p>
				</div>
			</div>
		</transition>
		<div id="container">
			<span id="leftbox" class="box">
				<span id="labelbox">
					<h2>Members</h2>
					<button id="live" class="box">LIVE</button>
				</span>
				<div class="member-box">
					<p v-if="error" style="color: #ff0000aa; margin: auto">
						Error loading list, try relog
					</p>
					<div name="list" tag="div" id="online-members-box">
						<span
							v-for="online_member in online_members"
							:key="online_member"
							class="box member-item onlinemem"
						>
							<span id="lefter">
								<img
									:src="online_member.skinURL"
									alt="skin"
									width="50"
									height="50"
									id="m_skin"
								/>
								<div>
									<h4 id="m_ign">{{ online_member.ign }}</h4>
									<p id="m_uuid" class="hide-mobile">
										{{ online_member.uuid }}
									</p>
								</div>
							</span>
							<span id="righter">
								<div>
									<p
										id="m_status"
										v-if="online_member.datetime"
									>
										Online for
									</p>
									<p id="m_datetime">
										{{ online_member.datetime }}
									</p>
								</div>
								<div class="m-location" id="m-location-online">
									<p>{{ online_member.location }}</p>
									<svg
										style="width: 20px; height: 20px"
										viewBox="0 0 24 24"
										class="icon"
									>
										<path
											fill="currentColor"
											d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
										/>
									</svg>
								</div>
							</span>
						</span>
					</div>
					<div
						id="member-border"
						v-if="online_members.length > 0"
					></div>
					<div name="" tag="p">
						<span
							v-for="offline_member in offline_members"
							:key="offline_member"
							class="box member-item offlinemem"
						>
							<span id="lefter">
								<img
									:src="offline_member.skinURL"
									alt="skin"
									width="50"
									height="50"
									id="m_skin"
								/>
								<div>
									<h4 id="m_ign">{{ offline_member.ign }}</h4>
									<p id="m_uuid" class="hide-mobile">
										{{ offline_member.uuid }}
									</p>
								</div>
							</span>
							<span id="righter">
								<div>
									<p
										id="m_status"
										v-if="offline_member.datetime"
									>
										Last seen
									</p>
									<p id="m_datetime">
										{{ offline_member.datetime }}
									</p>
								</div>
								<div class="m-location" id="m-location-offline">
									<p id="offline-location">
										{{ offline_member.location }}
									</p>
									<svg
										style="width: 20px; height: 20px"
										viewBox="0 0 24 24"
										class="icon"
									>
										<path
											fill="currentColor"
											d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
										/>
									</svg>
								</div>
							</span>
						</span>
					</div>
				</div>
			</span>
			<span id="statistic" class="box">
				<div id="status-box" class="box">
					<h3>Server Status</h3>
					<div v-for="status in serverStatus" v-bind:key="status">
						<div class="status-item">
							<svg
								style="width: 20px; height: 20px"
								viewBox="0 0 24 24"
								class="icon"
								v-if="status.online"
							>
								<path
									fill="hsl(165, 86%, 42%)"
									d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
								/>
							</svg>
							<svg
								style="width: 20px; height: 20px"
								viewBox="0 0 24 24"
								class="icon"
								v-if="!status.online"
							>
								<path
									fill="rgb(94, 105, 122)"
									d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
								/>
							</svg>
							<p>
								{{ status.name }}
								<!-- {{ status.online ? "Online" : "Offline" }} -->
							</p>
						</div>
					</div>
				</div>
				<div id="resource-box" class="box">
					<h3>Resources</h3>
					<progress-bar
						title="CPU usage"
						:percent="cpuPercent"
						class="box"
					></progress-bar>
					<progress-bar
						title="RAM usage"
						:percent="ramPercent"
						class="box"
					></progress-bar>
				</div>
			</span>
		</div>
		<footer>
			<p>Commit: {{ commit_hash }}</p>
			<p>Built at: {{ build_date }}</p>
		</footer>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RingLoader from 'vue-spinner/src/RingLoader.vue';
import ProgressBar from '@/components/ProgressBar.vue';

import { AxiosError } from 'axios';
import moment from 'moment';
import { io, Socket } from 'socket.io-client';
import * as Helper from '@/Helper';
import { DefaultEventsMap } from 'node_modules/socket.io-client/build/typed-events';
import router from '@/router';
import { commit_hash, build_date } from '@/config.json';

@Options({
	components: {
		RingLoader,
		ProgressBar
	},
})
export default class Dashboard extends Vue {

	socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
	timeUpdateInterval?: number;
	connectionErrorText = 'Connecting . . .';

	loading_member = true;
	loading_cpuChart = true;
	loading_ramChart = true;

	cpuPercent = 0;
	ramPercent = 0;

	serverStatus = [];

	online_members: any[] = [];
	offline_members: any[] = [];
	neterror = false;

	commit_hash = commit_hash;
	build_date = build_date;

	fullDurationString(duration: moment.Duration): string {
		let str = '';
		const days = Math.floor(duration.asDays());
		const hours = duration.hours();
		const mins = duration.minutes();
		const secs = duration.seconds();
		if (days) str += `${days}d `;
		if (hours) str += `${hours}h `;
		if (mins) str += `${mins}m `;
		if (secs) str += `${secs}s`;
		return str;
	}


	unmounted(): void {
		clearInterval(this.timeUpdateInterval);
		this.socket?.disconnect();
		console.log('unmount detected, disconnected from socket and removed time update interval');
	}

	mounted(): void {

		// ---------------------- SOCKET ----------------------

		this.socket = io("https://omsinkrissada.sytes.net", { path: '/socketio/minecraft', auth: { token: localStorage.accessToken } });
		this.socket.on('connect_error', (err) => {
			console.error(err);
			if (err.message.includes('token')) {
				localStorage.removeItem('accessToken');
				router.push('/');
			}
		});
		this.socket.on('connect', () => {
			console.log('connected');
			this.connectionErrorText = '';

			// Get initial member data
			Helper.get('/members').then(data => {
				console.log('got data');

				const onlines = [];
				const offlines = [];
				for (const member of data) {
					if (member.online) {
						member.datetime = member.onlineSince ? `${this.fullDurationString(moment.duration(moment().valueOf() - moment(member.onlineSince).valueOf(), 'ms'))}` : 'invalid time format';
						member.location = member.location ?? '';
						onlines.push(member);
					} else {
						member.datetime = member.offlineSince ? `${moment(member.lastseen).fromNow()}` : 'invalid date format';
						member.location = 'Offline';
						offlines.push(member);

					}
				}
				onlines.sort((a, b) => moment(a.onlineSince).valueOf() - moment(b.onlineSince).valueOf());
				offlines.sort((a, b) => moment(b.offlineSince).valueOf() - moment(a.offlineSince).valueOf());
				this.online_members = onlines;
				this.offline_members = offlines;
				updateOnlineMemberTime();
				updateOfflineMemberTime();
			}).catch((err: AxiosError) => {
				if (err.message) {
					console.error(err.message);
					this.neterror = true;
				}
			}).finally(() => this.loading_member = false);
		});

		this.socket.on('memberLocationUpdate', updatedMember => {
			this.online_members.filter(member => member.uuid == updatedMember.uuid)[0].location = updatedMember.location;
		});

		this.socket.on('memberStatusUpdate', updatedMember => {
			if (updatedMember.online) {
				const member = this.offline_members.filter(member => member.uuid == updatedMember.uuid)[0];
				this.offline_members = this.offline_members.filter(member => member.uuid != updatedMember.uuid);

				member.onlineSince = new Date();
				member.location = member.location ?? '';
				if (member.location == 'offline') member.location = '';
				this.online_members.push(member);
				updateOnlineMemberTime();
			} else {
				const member = this.online_members.filter(member => member.uuid == updatedMember.uuid)[0];
				this.online_members = this.online_members.filter(member => member.uuid != updatedMember.uuid);

				member.offlineSince = new Date();
				member.location = 'offline';
				this.offline_members.unshift(member);
				updateOfflineMemberTime();
			}
		});

		this.socket.on('resourcesStatus', res => {
			this.cpuPercent = res.cpuPercent.toFixed(2);
			this.ramPercent = res.ramPercent.toFixed(2);
		});
		this.socket.on('serversStatus', res => {
			this.serverStatus = res;
			this.serverStatus.sort();
		});
		this.socket.on('disconnect', () => {
			console.log('disconnected');
			this.connectionErrorText = 'Disconnected, trying to reconnect . . .';
		});
		// ----------------------------------------------------

		const updateOnlineMemberTime = () => {
			this.online_members.map(member => {
				const durationms = moment().valueOf() - moment(member.onlineSince).valueOf();
				member.datetime = `${this.fullDurationString(moment.duration(durationms, 'ms'))}`;
			});
		};
		const updateOfflineMemberTime = () => {
			this.offline_members.map(member => {
				member.datetime = member.offlineSince ? moment(member.offlineSince).fromNow() : 'invalid time format';
			});
		};

		this.timeUpdateInterval = setInterval(() => {
			updateOnlineMemberTime();
			updateOfflineMemberTime();
		}, 1000);



	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	// background-color: rgba(19, 40, 59, 0.856);
	// background-color: hsl(210, 0%, 14%);
	display: relative;
	background-color: rgb(17, 24, 39);
}

#connection-banner {
	position: fixed;
	top: 0%;
	z-index: 5;

	background-color: rgba(0, 0, 0, 0.733);
	// backdrop-filter: blur(5px);

	width: 100vw;
	height: 100vh;

	transition: 0.5s;

	#connection-banner-box {
		display: flex;
		position: fixed;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100vw;
		height: 100vh;
	}
	.loader {
		// background-color: green;
		margin-bottom: 50px;
	}
	p {
		// background-color: aqua;
		color: white;
		font-size: 20px;
		font-family: Inter, Quicksand, system-ui;
	}
}

#container {
	height: auto;
	display: flex;
	padding-top: 50px;
	// margin-right: 15rem;
	// margin-left: 15rem;
	// margin-right: 10vw;
	// margin-left: 10vw;

	justify-content: space-evenly;
	align-items: flex-start;
}

#leftbox {
	// mine:
	// background-color: hsla(210, 3%, 21%, 0.773);

	// I copy ideal:
	// background-color: rgba(255, 255, 255, 0.11);

	box-shadow: 0px 0px 3px #000000;

	// exact from ideal:
	background-color: rgb(31, 41, 55);

	margin: 0px 5px 20px 5px;
	// width: 100%;
	// width: 50%;
}

#labelbox {
	display: flex;
	justify-content: space-between;
	align-items: center;

	border-radius: 10px;
	padding: 20px 20px 10px 20px;
	width: auto;
	height: 2rem;
	// background-color: hsla(210, 3%, 38%, 0.397);
	// box-shadow: 0px 0px 3px #000000;

	h2 {
		// color: #00ccff;
		color: white;
		font-family: Inter;
		font-size: 1.5rem;
	}
}

.greyscale {
	filter: grayscale(3);
}

#live {
	display: none;
	color: rgb(255, 191, 191);
	height: 1.2rem;
	padding: 0px 10px 0px 10px;
	margin-left: 10px;
	background-color: rgba(255, 0, 0, 0.178);
	border: 1px solid red;
	border-radius: 100px;
	font-family: system-ui;
	font-size: 0.8rem;
	text-align: center;
	line-height: 0px;
}

.box {
	border-radius: 10px;
}

.member-box {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	width: 700px;
	// max-width: 90vmin;

	// background-color: antiquewhite;

	#member-loader {
		padding: 15px;
	}
}

#member-border {
	align-self: center;
	width: 600px;
	height: 2px;
	border-radius: 1px;
	background-color: #ffffff63;
}

.status-header {
	margin: 10px;
	margin-left: 25px;
	color: hsl(0, 0%, 50%);

	font-size: 1.5rem;
	align-self: flex-start;
}

.member-item {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	// height: 3rem;
	width: auto;
	margin: 1rem;
	padding: 0.5rem;
	list-style: none;
	text-align: left;

	// box-shadow: 0px 0px 10px hsl(0, 0%, 12%);
	// border: 2px solid hsl(0, 0%, 40%);
	// background: hsl(240, 0%, 28%);
	// color: hsl(201, 69%, 53%);
	color: #00ccff;

	// color: white;

	#lefter {
		display: flex;
		align-items: center;
		// margin-right: 10px;
		div {
			margin: 6px;
		}
		#m_skin {
			margin: 5px;
			border-radius: 3px;
			box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.678);
			image-rendering: pixelated;
		}
		#m_ign {
			font-size: 1.25rem;
			font-family: "Inter";
			font-weight: 500;
			// text-shadow: 0px 0px 2px black;
		}
		#m_uuid {
			// color: rgb(112, 112, 112);
			color: rgb(110, 110, 110);
			font-size: 0.8rem;
			font-family: "Consolas", "Quicksand", "Courier New", Courier,
				monospace;
			font-weight: 500;
		}
	}

	#righter {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

		margin: 6px;

		color: #353535;
		font-family: Inter;

		div {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
		}

		p {
			font-size: 0.9rem;
		}

		#m_status {
			color: hsl(0, 0%, 55%);
			margin-right: 5px;

			font-weight: 500;
		}

		#m_datetime {
			color: hsl(0, 0%, 85%);
			// font-size: 0.8rem;
			// font-weight: bold;
			// text-shadow: 0px 0px 2px black;
		}

		.m-location {
			display: flex;
			align-content: center;

			text-transform: uppercase;
			font-weight: bold;
			// text-shadow: 0px 0px 2px black;y

			.icon {
				margin-left: 10px;
			}
		}

		#m-location-online {
			color: hsl(165, 86%, 42%);
		}
		#m-location-offline {
			color: rgb(94, 105, 122);
		}
	}
}

#statistic {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h3 {
		align-self: flex-start;
		margin-bottom: 20px;
		color: white;
		font-size: 30px;
		font-weight: bold;
		font-family: "Inter", system-ui;
	}

	#status-box {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		width: 400px;

		padding: 20px 20px;
		margin: 0px 5px 25px 5px;

		box-shadow: 0px 0px 3px #000000;
		background-color: rgb(31, 41, 55); // ideal's

		.status-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			p {
				margin: 5px 6px;

				color: white;
				font-size: 18px;
				font-family: "Inter", system-ui;
			}
		}
	}

	#resource-box {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 400px;

		padding: 20px 20px;
		margin: 0px 5px 25px 5px;

		box-shadow: 0px 0px 3px #000000;
		background-color: rgb(31, 41, 55); // ideal's
	}
}

footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 20px 40px;

	border-top: #00495c44 2px solid;

	p {
		margin: 3px;
		color: hsla(213, 45%, 36%, 0.842);
		font-size: 16px;
		font-family: "Inter";
		font-weight: 500;
	}
}

@media only screen and (max-width: 768px) {
	.hide-mobile {
		display: none;
	}
	#container {
		flex-direction: column-reverse;
		align-items: center;
	}
	#leftbox {
		width: 95%;
	}
	#member-border {
		width: 95%;
	}
	.member-box {
		width: 100%;
	}
	.member-item {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		#lefter {
			// flex-wrap: wrap;
		}
		#righter {
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			width: 100%;

			#offline-location {
				display: none;
			}
		}
	}
	#statistic {
		width: 95%;
		#status-box {
			width: 100%;
		}
		#resource-box {
			width: 100%;
		}
	}
}

.list-item {
	display: inline-block;
	margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
	transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(30px);
	transition: all 1s;
}
</style>