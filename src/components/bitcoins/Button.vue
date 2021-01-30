<template>
  <v-btn small :color="color" :disabled="disabled" @click="$emit('click')"
    ><slot
  /></v-btn>
</template>
<script>
export default {
  name: "List",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    }
  }
};
</script>
