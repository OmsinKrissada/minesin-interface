<template>
	<div>
		<iframe
			:src="link"
			width="100%"
			height="100%"
			title="World Map"
		></iframe>
		<!-- <h3>Map not available, sorry for your inconvenience.</h3> -->
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'



@Component({})
export default class Map extends Vue {
	link = window.location.protocol + "//" + window.location.hostname + ":8123";
}

</script>

<style scoped lang="scss">
h3 {
	position: absolute;
}
</style>
