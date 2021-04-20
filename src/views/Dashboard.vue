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
					<div name="" tag="p">
						<span
							v-for="member in online_members"
							:key="member"
							class="box member-item onlinemem"
						>
							<span id="lefter">
								<img
									:src="member.skinURL"
									alt="skin"
									width="50"
									height="50"
									id="m_skin"
								/>
								<div>
									<h4 id="m_ign">{{ member.ign }}</h4>
									<p id="m_uuid">{{ member.uuid }}</p>
								</div>
							</span>
							<span id="righter">
								<div>
									<p id="m_status" v-if="member.datetime">
										Online for
									</p>
									<p id="m_datetime">{{ member.datetime }}</p>
								</div>
								<p id="m_location">{{ member.location }}</p>
							</span>
						</span>
					</div>
					<div name="" tag="p">
						<span
							v-for="member in offline_members"
							:key="member"
							class="box member-item offlinemem"
						>
							<span id="lefter">
								<img
									:src="member.skinURL"
									alt="skin"
									width="50"
									height="50"
									id="m_skin"
								/>
								<div>
									<h4 id="m_ign">{{ member.ign }}</h4>
									<p id="m_uuid">{{ member.uuid }}</p>
								</div>
							</span>
							<span id="righter">
								<div>
									<p id="m_status">Last seen</p>
									<p id="m_datetime">{{ member.datetime }}</p>
								</div>
								<p id="m_location">{{ member.location }}</p>
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
					<ring-loader
						:loading="loading_cpuChart"
						color="#FFFFFF"
						class="loader"
					></ring-loader>
					<canvas
						v-show="!loading_cpuChart"
						ref="cpuChart"
						class="chart"
					></canvas>
				</div>
				<div class="box">
					<ring-loader
						:loading="loading_memChart"
						color="#FFFFFF"
						class="loader"
					></ring-loader>
					<canvas
						v-show="!loading_memChart"
						ref="memChart"
						class="chart"
					></canvas>
				</div>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { Chart, LinearScale, registerables } from 'chart.js'
import { endpoint } from '../config.json';
import * as Helper from '@/Helper';

@Options({
	components: {
		HelloWorld,
		RingLoader
	},
})
export default class Dashboard extends Vue {

	loading_member = true;
	loading_cpuChart = true;
	loading_memChart = true;
	loading_statChart = true;

	online_members: any[] = [];
	offline_members: any[] = [];
	doLive = true;
	member_interval: number | undefined;
	neterror = false;

	fullDurationString(duration: moment.Duration) {
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

	toggleLive() {
		if (this.doLive) {
			clearInterval(this.member_interval)
			this.doLive = false;
			sessionStorage.setItem('live_member', '0');
		} else {
			this.member_interval = setInterval(this.getMember, 1000);
			this.doLive = true;
			sessionStorage.setItem('live_member', '1');
		}
	}


	unmounted() {
		clearInterval(this.member_interval);
	}

	getMember() {
		Helper.get('/members').then(data => {
			const onlines = [];
			const offlines = [];
			for (const member of data) {
				if (member.online) {
					// member.ign = '🟢 ' + member.ign;
					member.datetime = member.onlineFor ? `${this.fullDurationString(moment.duration(member.onlineFor, 'ms'))}` : 'invalid time format'
					member.location = (member.location ?? '') + ' 🟢'
					onlines.push(member);
				} else {
					// member.ign = '⚫ ' + member.ign;
					member.datetime = member.lastseen ? `${moment(member.lastseen).fromNow()}` : 'invalid date format'
					member.location = '⚫'
					offlines.push(member);

				}
			}
			onlines.sort();
			offlines.sort((a, b) => moment(b.lastseen).valueOf() - moment(a.lastseen).valueOf());
			this.online_members = onlines;
			this.offline_members = offlines;
		}).catch((err: AxiosError) => {
			if (err.message) {
				console.error(err.message)
				this.neterror = true;
			}
		}).finally(() => this.loading_member = false)
	}

	mounted() {
		if (sessionStorage.getItem('live_member')) {
			if (sessionStorage.getItem('live_member') == '1') this.doLive = true;
			else this.doLive = false;
		}


		this.getMember();
		if (this.doLive) this.member_interval = setInterval(this.getMember, 1000);
		// axios.get(endpoint + '/members', { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }).then(res => {
		// 	for (const member of res.data) {
		// 		if (member.online) {
		// 			member.status = 'Online'
		// 			member.datetime = member.onlineFor ? `${this.fullDurationString(member.onlineFor)}` : 'invalid time format'
		// 		} else {
		// 			member.status = 'Last seen'
		// 			member.datetime = member.lastseen ? `${moment(member.lastseen).fromNow()}` : 'invalid date format'
		// 			console.log(member.lastseen)
		// 		}
		// 		this.members.push(member);
		// 	}
		// }).catch((err: AxiosError) => {
		// 	if (err.message) {
		// 		console.error(err.message)
		// 		this.error = true;
		// 	}
		// }).finally(() => this.loading_member = false)

		Chart.register(...registerables);

		axios.get(endpoint + '/cpuusage', { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }).then(res => {
			const cpupercent = res.data.percent;
			this.loading_cpuChart = false;
			var ctx: any = this.$refs['cpuChart'];
			var cpuChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ['Used', 'Free'],
					datasets: [{
						label: 'CPU Usage (%)',
						data: [cpupercent, 100 - (cpupercent ?? 0)],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
						],
						borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'CPU Usage (%)',
							color: '#84ff00'
						}
					}
				},
			});
		})

		axios.get(endpoint + '/memusage', { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }).then(res => {
			const mempercent = res.data.percent;
			this.loading_memChart = false;
			var ctx: any = this.$refs['memChart'];
			var memChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ['Used', 'Free'],
					datasets: [{
						label: 'Memory Usage (%)',
						data: [mempercent, 100 - (mempercent ?? 0)],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
						],
						borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'Memory Usage (%)',
							color: '#84ff00'
						}
					}
				},
			});
		})

		axios.get(endpoint + '/memberstat', { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }).then(res => {
			const playercounts = res.data.counts;
			const labels = [];
			for (let i = 12; i >= 0; i--) {
				labels.push(`${i} hrs ago`)
			}
			this.loading_statChart = false;
			var ctx: any = this.$refs['statChart'];
			var statChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						label: 'count',
						data: playercounts,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
						tension: 0.4,
						pointRadius: 1,
					}],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: true,
							text: 'Player Count',
							color: '#84ff00'
						},
						decimation: { enabled: true, samples: 12 },
					},
					scales: {
						x: {
							beginAtZero: true,
							ticks: {
								callback: function (label, index, labels) {
									if (+label % 10 == 0) {
										return label.toString();
									} else {
										return '';
									}

								}
							}
						},

					},
				},
			});
		})
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	// background-color: rgba(19, 40, 59, 0.856);
	background-color: hsl(210, 0%, 14%);
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
	background-color: hsla(210, 3%, 21%, 0.773);
	box-shadow: 0px 0px 10px #000000;
	margin: 0px 5px 20px 5px;
	// width: 100%;
	// width: 50%;
}

#labelbox {
	display: flex;
	justify-content: space-between;
	align-items: center;

	border-radius: 10px;
	padding: 15px;
	width: auto;
	height: 2rem;
	background-color: hsla(210, 3%, 38%, 0.397);
	box-shadow: 0px 0px 3px #000000;

	h2 {
		color: #00ccff;
		font-family: Raleway;
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

	// box-shadow: 0px 0px 6px rgba(179, 179, 179, 0.493);
	box-shadow: 0px 0px 10px hsl(0, 0%, 12%);
	border: 2px solid hsl(0, 0%, 40%);
	// border: #494949;
	background: hsl(240, 0%, 28%);
	color: hsl(201, 69%, 53%);

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
			font-family: "Open Sans";
			font-weight: 100;
			// text-shadow: 0px 0px 2px black;
		}
		#m_uuid {
			// color: rgb(112, 112, 112);
			color: rgb(110, 110, 110);
			font-size: 0.8rem;
			font-family: Quicksand;
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
		font-family: Montserrat;

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
			font-weight: bold;
			// text-shadow: 0px 0px 2px black;
		}

		#m_location {
			color: hsl(165, 86%, 42%);
			text-transform: uppercase;
			font-weight: bold;
			text-shadow: 0px 0px 2px black;
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

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #333536c5;
		box-shadow: 0px 0px 10px #000000;
		// width: 100%;
		width: 312px;
		height: 312px;
		margin: 0px 5px 25px 5px;

		.loader {
			margin: 0;
			background-color: transparent;
			box-shadow: none;
		}
	}
	.chart {
	}
}

@media only screen and (max-width: 768px) {
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
			flex-wrap: wrap;
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
}
</style>