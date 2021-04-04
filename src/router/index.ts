// import Vue from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Home from '../views/Home.vue'
import Cover from "../views/Cover.vue"
import Map from "../views/Map.vue"

function hasToken(to: any, from: any, next: any) {
	if (localStorage.accessToken) return next();
	else return next('/');
}

function skipping(to: any, from: any, next: any) {
	if (localStorage.accessToken) return next('/dashboard')
	else return next();
}

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Cover",
		component: Cover,
		beforeEnter: skipping
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		beforeEnter: hasToken
	},
	// {
	// 	path: "/members",
	// 	name: "Members",
	// 	component: Members,
	// 	beforeEnter: hasToken
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	// component: () => import(/* webpackChunkName: "about" */ "../views/Members.vue")
	// },
	{
		path: "/map",
		name: "Map",
		component: Map,
		beforeEnter: hasToken
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router


