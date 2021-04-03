// import Vue from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Home from '../views/Home.vue'
import Cover from "../views/Cover.vue"
import Members from "../views/Members.vue"
import Map from "../views/Map.vue"

import Auth from '../auth';

// function ifAuthorized(to: Route, from: Route, next: Function) {
// 	if (Auth.token) return next();
// 	else return next('/');
// }

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Cover",
		component: Cover
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		// beforeEnter: ifAuthorized
	},
	{
		path: "/members",
		name: "Members",
		component: Members,
		// beforeEnter: ifAuthorized
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ "../views/Members.vue")
	},
	{
		path: "/map",
		name: "Map",
		component: Map,
		// beforeEnter: ifAuthorized
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router


