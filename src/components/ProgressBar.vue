<template>
	<span id="debox">
		<p class="label">{{ title }}</p>
		<div class="bar-box">
			<div class="bar" id="cpu-bar" v-bind:style="barStyles"></div>
		</div>
		<p class="percentage">{{ percent + "%" }}</p>
	</span>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

const Component = defineComponent({
	props: {
		title: String,
		percent: { default: 0, type: Number }
	},
	data: function () {
		return {
			barStyles: {}
		}
	},
	watch: {
		percent: function () {
			let color;
			if (this.percent > 85) color = '#f55442';
			else if (this.percent > 70) color = '#d49816'
			else color = '#4bc588';
			this.barStyles = {
				width: this.percent + '%',
				'background-color': color
			};
		}
	}
})
export default Component
</script>


<style scoped lang="scss">
#debox {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px;

	font-family: Inter, system-ui;
	// background-color: rgb(57, 64, 73);
}

.label {
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 5px;
}
.bar-box {
	width: 280px;
	height: 35px;
	background-color: rgb(58, 71, 88);
	border-radius: 8px;
}
.bar {
	color: #d49816;
	width: 0px;
	height: 100%;
	border-radius: 8px;

	transition: width 0.5s ease-in-out, background-color 0.2s ease-in-out;
}
.percentage {
	position: absolute;
	align-self: flex-end;
	margin-top: 5px;
	color: white;
	font-size: 16px;
}
</style>