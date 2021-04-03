<template>
	<div class="dashboard">
		<h1>Main page goes here</h1>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
	components: {
		HelloWorld,
	},
})
export default class Dashboard extends Vue { }
</script>
