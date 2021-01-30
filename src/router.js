import Vue from "vue";
import VueRouter from "vue-router";
import Modals from "./components/modals/Modals";
import Bitcoin from "./components/bitcoins/Bitcoin";

Vue.use(VueRouter);

const routes = [
  { path: "/Dynamic-Panels/", component: Modals, name: "modals" },
  { path: "/Dynamic-Panels/bitcoin/", component: Bitcoin, name: "bitcoin" }
];
const createRouter = function() {
  return new VueRouter({
    mode: "history",
    routes
  });
};
export default createRouter;
