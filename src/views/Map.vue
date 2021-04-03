<template id='temp'>
	<div id="box">
		<iframe
			v-if="success"
			:src="link"
			width="100%"
			height="100%"
			title="World Map"
		></iframe>
		<!-- <h3>Map not available, sorry for your inconvenience.</h3> -->
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'



@Options({})
export default class Map extends Vue {
	success = true;
	link = '';
	mounted() {
		this.link = 'http://ubunsin/api/minecraft/map/'
	}
}

</script>

<style scoped lang="scss">
h3 {
	position: absolute;
}
iframe {
	// position: absolute;
}
#box {
	height: 100vh;
	margin: 0%;
}
#temp {
	margin: 0%;
}
</style>
