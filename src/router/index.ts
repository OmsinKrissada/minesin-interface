import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Cover from "../views/Cover.vue"
import Members from "../views/Members.vue"
import Map from "../views/Map.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Cover",
		component: Cover
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard
	},
	{
		path: "/members",
		name: "Members",
		component: Members
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ "../views/Members.vue")
	},
	{
		path: "/map",
		name: "Map",
		component: Map
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
