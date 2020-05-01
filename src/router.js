import Vue from "vue";
import VueRouter from "vue-router";
import Modals from "./components/Modals";
import Bitcoin from "./components/Bitcoin";

Vue.use(VueRouter);

const routes = [
  { path: "/Vue-Test/", component: Modals, name: "modals" },
  { path: "/Vue-Test/bitcoin/", component: Bitcoin, name: "bitcoin" }
];
const createRouter = function() {
  return new VueRouter({
    mode: "history",
    routes
  });
};
export default createRouter;
