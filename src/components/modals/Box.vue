<template>
  <div
    class="box"
    :style="{
      width: item.width + 'px',
      height: item.height + 'px',
      top: item.y + 'px',
      left: item.x + 'px',
      zIndex: item.z + ''
    }"
  >
    <div class="box-wrapper">
      <div
        class="top-border border"
        @mousedown.self="expand(id, 'top', $event)"
      ></div>
      <div class="inner-container">
        <div
          class="left-border border"
          @mouseup.self="up"
          @mousedown.self="expand(id, 'left', $event)"
        ></div>
        <div class="mx-auto" @mousedown="down(id, $event)">
          <v-card outlined>
            <v-list-item>
              <v-list-item-content>
                <div class="overline mb-4" @mousedown.stop="close(id)">
                  &#10005;
                </div>
                <v-list-item-title class="headline mb-1">
                  Title
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
        <div
          class="right-border border"
          @mousedown.self="expand(id, 'right', $event)"
          @mouseup.self="up"
        ></div>
      </div>
      <div
        class="bottom-border border"
        @mousedown.self="expand(id, 'bottom', $event)"
        @mouseup.self="up"
      ></div>
    </div>
  </div>
</template>
<style>
.v-list-item__title {
  user-select: none;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  name: "Box",
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    id: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState("modal", ["boxes", "deleted", "clickedOn", "maxZindex"])
  },
  methods: {
    down(id) {
      this.$store.dispatch("modal/down", id);
    },
    up() {
      this.$store.commit("modal/clear");
    },
    expand(id, dir, ev) {
      ev.preventDefault();
      this.$store.commit("modal/setDirection", dir);
      this.$store.commit("modal/setClickedExpand", id);
    },
    close(id) {
      let boxes = [...this.boxes];
      boxes = boxes.filter(element => parseInt(element.id) !== parseInt(id));
      const deleted = this.deleted + 1;
      console.log(id, boxes);
      this.$store.commit("modal/setDeleted", deleted, id);
      this.$store.commit("modal/setBoxes", boxes);
      this.$store.commit("modal/saveToLocal");
    }
  }
};
</script>
