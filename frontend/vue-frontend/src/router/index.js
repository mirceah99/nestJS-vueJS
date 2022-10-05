import { createRouter, createWebHistory } from "vue-router";
import ProductsTable from "../components/ProductsTable.vue";
const routes = [
	{
		path: "/produse",
		name: "home",
		component: ProductsTable,
	},
	{ path: "/:notFound(.*)", redirect: "/produse" },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
