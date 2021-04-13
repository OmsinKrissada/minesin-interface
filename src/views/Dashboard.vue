<template>
	<div class="dashboard">
		<div id="container">
			<span id="leftbox" class="box">
				<h3 class="label">Members</h3>
				<ul class="memberbox">
					<ring-loader
						:loading="loading_member"
						color="#FFFFFF"
						id="member-loader"
					></ring-loader>
					<p v-if="error" style="color: #ff0000aa">
						Error loading list, try relog
					</p>
					<transition-group name="list" tag="p">
						<li
							v-for="member in members"
							:key="member"
							class="box memberitem"
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
								<p id="m_status">{{ member.status }}</p>
								<p id="m_datetime">{{ member.datetime }}</p>
							</span>
						</li>
					</transition-group>
				</ul>
				<ul class="memberbox">
					<ring-loader
						:loading="loading_member"
						color="#FFFFFF"
						id="member-loader"
					></ring-loader>
					<p v-if="neterror" style="color: #ff0000aa">
						Error loading list, please check your internet
						connection.
					</p>
					<transition-group name="list" tag="p">
						<li
							v-for="member in members"
							:key="member"
							class="box memberitem"
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
								<p id="m_status">{{ member.status }}</p>
								<p id="m_datetime">{{ member.datetime }}</p>
							</span>
						</li>
					</transition-group>
				</ul>
			</span>
			<span id="statistic" class="box">
				<div class="box">
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
				</div>
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

	members: any = [];
	neterror = false;

	fullDurationString(duration: moment.Duration) {
		let str = '';
		const days = Math.floor(duration.asDays());
		const hours = duration.hours();
		const mins = duration.minutes();
		const secs = duration.seconds();
		if (days) str += `${days} day${days > 1 ? 's' : ''} `;
		if (hours) str += `${hours} hour${hours > 1 ? 's' : ''} `;
		if (mins) str += `${mins} minute${mins > 1 ? 's' : ''} `;
		if (secs) str += `${secs} second${secs > 1 ? 's' : ''}`;
	}


	mounted() {
		Helper.get('/members').then(data => {
			for (const member of data) {
				if (member.online) {
					member.status = 'Online'
					member.datetime = member.onlineFor ? `${this.fullDurationString(member.onlineFor)}` : 'invalid time format'
				} else {
					member.status = 'Last seen'
					member.datetime = member.lastseen ? `${moment(member.lastseen).fromNow()}` : 'invalid date format'
					console.log(member.lastseen)
				}
				this.members.push(member);
			}
		}).catch((err: AxiosError) => {
			if (err.message) {
				console.error(err.message)
				this.neterror = true;
			}
		}).finally(() => this.loading_member = false)
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
	background-color: #151719f3;
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
	display: block;
	flex-direction: column;
	background-color: #333536c5;
	box-shadow: 0px 0px 10px #000000;
	// width: 100%;
	width: 50%;
}

.label {
	text-align: left;
	font-size: 1.5rem;
	border-radius: 10px;
	padding: 15px;
	width: auto;
	height: 2rem;
	color: #00ccff;
	font-family: Raleway;
	background-color: rgba(95, 97, 100, 0.397);
	box-shadow: 0px 0px 3px #000000;
}

.box {
	border-radius: 10px;
}

.memberbox {
	display: flex;
	padding: 0%;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	// background-color: antiquewhite;

	#member-loader {
		padding: 15px;
	}
}

.memberitem {
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
	box-shadow: 0px 0px 10px rgb(31, 31, 31);
	// border: #494949;
	background: rgb(65, 65, 65);
	color: rgb(47, 153, 209);

	#lefter {
		display: flex;
		flex-direction: row;
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
			font-family: Raleway;
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
		justify-content: space-around;
		align-items: flex-end;

		color: #353535;
		font-family: Quicksand;

		#m_status {
			color: rgb(133, 133, 133);
			font-weight: bold;
		}

		#m_datetime {
			color: rgb(182, 182, 182);
			font-size: 0.8rem;
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
		// width: 100%;
		width: 312px;
		height: auto;
		margin-bottom: 25px;
	}
	.chart {
	}

	.loader {
		background-color: none;
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