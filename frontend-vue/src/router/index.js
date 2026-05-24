import { createRouter, createWebHistory } from "vue-router";
import Login from "../features/auth/pages/LoginPage.vue";
import Dashboard from "../features/trips/pages/DashboardPage.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
