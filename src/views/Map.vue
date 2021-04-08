<template id='temp'>
	<div id="box">
		<iframe
			v-if="success"
			src="https://omsinkrissada.sytes.net/api/minecraft/map/"
			width="100%"
			height="100%"
			title="World Map"
		></iframe>
		<!-- <div v-html="page"></div> -->
		<!-- <h3>Map not available, sorry for your inconvenience.</h3> -->
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { Options, Vue } from 'vue-class-component'
import { endpoint } from '../config.json';
import { authHeader } from '../Helper';



@Options({})
export default class Map extends Vue {

	success = true;
	page = '';
	async mounted() {
		this.page = await (await axios.get(endpoint + '/map/.', authHeader)).data;
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
