<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import createRouter from "@/router";
let router = createRouter();
export default {
  name: "App",

  components: {},

  data: () => ({}),
  router
};
</script>
