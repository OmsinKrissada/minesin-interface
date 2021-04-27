<template>
	<div class="dashboard">
		<div id="container">
			<span id="leftbox" class="box">
				<span id="labelbox">
					<h2>Members</h2>
					<button
						id="live"
						class="box button"
						:class="doLive ? '' : 'greyscale'"
						v-on:click="toggleLive"
					>
						LIVE
					</button>
				</span>
				<div class="member-box">
					<ring-loader
						:loading="loading_member"
						color="#FFFFFF"
						id="member-loader"
						style="margin: auto"
					></ring-loader>
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
									<p>{{ offline_member.location }}</p>
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
				<!-- <div class="box">
					<ring-loader
						:loading="loading_statChart"
						color="#FFFFFF"
						class="loader"
					></ring-loader>
					<canvas
						v-show="!loading_statChart"
						ref="statChart"
						class="chart"
					></canvas>
				</div> -->

				<div class="box">
					<p>Resources</p>
					<ring-loader
						:loading="loading_cpuChart || loading_ramChart"
						color="#FFFFFF"
						class="loader"
					></ring-loader>
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
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import ProgressBar from '@/components/ProgressBar.vue';

import { AxiosError } from 'axios';
import moment from 'moment';
import { Chart, registerables } from 'chart.js'
import { io } from 'socket.io-client'
import * as Helper from '@/Helper';

@Options({
	components: {
		HelloWorld,
		RingLoader,
		ProgressBar
	},
})
export default class Dashboard extends Vue {

	loading_member = true;
	loading_cpuChart = true;
	loading_ramChart = true;

	cpuPercent = 0;
	ramPercent = 0;

	online_members: any[] = [];
	offline_members: any[] = [];
	doLive = true;
	member_interval: number | undefined;
	neterror = false;

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

	toggleLive(): void {
		if (this.doLive) {
			clearInterval(this.member_interval)
			this.doLive = false;
			sessionStorage.setItem('live_member', '0');
		} else {
			// this.member_interval = setInterval(this.getMember, 1000);
			this.doLive = true;
			sessionStorage.setItem('live_member', '1');
		}
	}


	unmounted(): void {
		clearInterval(this.member_interval);
	}

	// getMember() {
	// }

	mounted(): void {
		if (sessionStorage.getItem('live_member')) {
			if (sessionStorage.getItem('live_member') == '1') this.doLive = true;
			else this.doLive = false;
		}

		// ---------------------- SOCKET ----------------------

		const socket = io("http://omsinkrissada.sytes.net:3002", { path: '/socketio/minecraft' });
		socket.on('connect', () => {
			console.log('connected');
		})

		// Get initial member data
		Helper.get('/members').then(data => {
			console.log('got data');

			const onlines = [];
			const offlines = [];
			for (const member of data) {
				if (member.online) {
					// member.ign = '🟢 ' + member.ign;
					member.datetime = member.onlineSince ? `${this.fullDurationString(moment.duration(moment().valueOf() - moment(member.onlineSince).valueOf(), 'ms'))}` : 'invalid time format'
					member.location = member.location ?? ''
					onlines.push(member);
				} else {
					member.datetime = member.offlineSince ? `${moment(member.lastseen).fromNow()}` : 'invalid date format'
					member.location = 'Offline'
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
				console.error(err.message)
				this.neterror = true;
			}
		}).finally(() => this.loading_member = false)

		socket.on('memberLocationUpdate', updatedMember => {
			this.online_members.filter(member => member.uuid == updatedMember.uuid)[0].location = updatedMember.location
		})

		socket.on('memberStatusUpdate', updatedMember => {
			if (updatedMember.online) {
				const member = this.offline_members.filter(member => member.uuid == updatedMember.uuid)[0];
				this.offline_members = this.offline_members.filter(member => member.uuid != updatedMember.uuid);

				member.onlineSince = new Date();
				member.location = member.location ?? ''
				if (member.location == 'offline') member.location = '';
				this.online_members.push(member)
				updateOnlineMemberTime();
			} else {
				const member = this.online_members.filter(member => member.uuid == updatedMember.uuid)[0];
				this.online_members = this.online_members.filter(member => member.uuid != updatedMember.uuid);

				member.offlineSince = new Date();
				member.location = 'offline'
				this.offline_members.unshift(member)
				updateOfflineMemberTime();
			}
		})

		socket.on('resourcesStatus', res => {
			this.cpuPercent = res.cpuPercent.toFixed(2);
			this.ramPercent = res.ramPercent.toFixed(2);
		})
		socket.on('disconnect', () => {
			console.log('disconnected')
		})
		// ----------------------------------------------------

		const updateOnlineMemberTime = () => {
			this.online_members.map(member => {
				const durationms = moment().valueOf() - moment(member.onlineSince).valueOf();
				member.datetime = `${this.fullDurationString(moment.duration(durationms, 'ms'))}`
			});
		}
		const updateOfflineMemberTime = () => {
			this.offline_members.map(member => {
				member.datetime = member.offlineSince ? moment(member.offlineSince).fromNow() : 'invalid time format'
			});
		}

		setInterval(() => {
			updateOnlineMemberTime();
			updateOfflineMemberTime();
		}, 1000)


		// this.getMember();
		// if (this.doLive) this.member_interval = setInterval(this.getMember, 1000);

		Chart.register(...registerables);
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	// background-color: rgba(19, 40, 59, 0.856);
	// background-color: hsl(210, 0%, 14%);
	background-color: rgb(17, 24, 39);
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

	// exact from ideal:
	background-color: rgb(31, 41, 55);

	// box-shadow: 0px 0px 10px #000000;
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

	&:hover {
		color: white;
		background-color: rgba(255, 0, 0, 0.616);
	}
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

			font-weight: bold;
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
	// width: 40%;
	width: 30%;

	p {
		align-self: flex-start;
		margin-bottom: 20px;
		color: white;
		font-size: 30px;
		font-weight: bold;
		font-family: Inter, system-ui;
	}

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		// background-color: #333536c5; // mine
		background-color: rgb(31, 41, 55); // ideal's

		// box-shadow: 0px 0px 10px #000000;
		padding: 20px 20px;
		margin: 0px 5px 25px 5px;

		.loader {
			position: absolute;
			visibility: hidden;
			background-color: transparent;
			box-shadow: none;
		}
	}
}

@media only screen and (max-width: 768px) {
	.hide-mobile {
		position: absolute;
		visibility: hidden;
	}
	#container {
		flex-direction: column;
		align-items: center;
	}
	#leftbox {
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