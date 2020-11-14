<template>
	<div class="dashboard">
		<h1>Main page goes here</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
	components: {
		HelloWorld,
	},
})
export default class Dashboard extends Vue { }
</script>
