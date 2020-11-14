<template>
	<div>
		<p>This is the cover page</p>
		<router-link to="/dashboard">Proceed to dashboard page</router-link>
	</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Cover extends Vue { }
</script>

<style>
</style>