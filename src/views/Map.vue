<template>
	<div id="box">
		<iframe :src="`${http_endpoint}/map/`" title="World Map"></iframe>
		<!-- <div id="lol"></div> -->

		<!-- <html v-html="page" id="frame"></html> -->
		<!-- <h3>Map not available, sorry for your inconvenience.</h3> -->
	</div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import { http_endpoint } from "../config.json";
import * as Helper from "../Helper";

@Options({})
export default class Map extends Vue {
	demo = `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1 style="color: #ff0000aa;">Error loading, please check your internet connection.</h1></body></html>`;
	page = "";
	srcuri = "";
	http_endpoint = http_endpoint;
	async mounted() {
		// let data: string;
		// try {
		// 	data = (await Helper.get('/map/'));
		// } catch (err) {
		// 	data = `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1 style="color: #ff0000aa;">Error loading, please check your internet connection.</h1></body></html>`;
		// }
		// // console.log(data)
		// this.page = data;
		// // this.page = data.replace(/js\//g, `${endpoint}/map/js/`).replace(/css\//g, `${endpoint}/map/css/`).replace(/image\//g, `${endpoint}/map/image/`).replace(/images\//g, `${endpoint}/map/images/`).replace(/standalone\//g, `${endpoint}/map/standalone/`).replace(/version.js/g, `${endpoint}/map/version.js`)
		// console.log(this.page)
		// this.srcuri = "data:text/html;charset=utf-8," + data;
	}
}
</script>

<style scoped lang="scss">
#box {
	box-sizing: border-box;
	height: 50%;
	margin: 0;
	padding: 0;
}

h3 {
	position: absolute;
}

iframe {
	width: 100%;
	height: 100%;
	border: 0;
}
</style>
