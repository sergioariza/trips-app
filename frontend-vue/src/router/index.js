import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
