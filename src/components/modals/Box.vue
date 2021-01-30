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
        @mousedown.self="expand(index, 'top', $event)"
      ></div>
      <div class="inner-container">
        <div
          class="left-border border"
          @mouseup.self="up"
          @mousedown.self="expand(index, 'left', $event)"
        ></div>
        <div class="mx-auto" @mousedown="down(index, $event)">
          <v-card outlined>
            <v-list-item>
              <v-list-item-content>
                <div class="overline mb-4" @mousedown.stop="close(index)">
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
          @mousedown.self="expand(index, 'right', $event)"
          @mouseup.self="up"
        ></div>
      </div>
      <div
        class="bottom-border border"
        @mousedown.self="expand(index, 'bottom', $event)"
        @mouseup.self="up"
      ></div>
    </div>
  </div>
</template>
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
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState("modal", ["boxes", "deleted", "clickedOn", "maxZindex"])
  },
  methods: {
    down(index) {
      this.$store.dispatch("modal/down", index);
    },
    up() {
      this.$store.commit("modal/clear");
    },
    expand(index, dir, ev) {
      ev.preventDefault();
      this.$store.commit("modal/setDirection", dir);
      this.$store.commit("modal/setClickedExpand", index);
    },
    close(index) {
      let boxes = this.boxes;
      boxes.splice(index, 1);
      const deleted = this.deleted + 1;
      this.$store.commit("modal/setDeleted", deleted);
      this.$store.commit("modal/setBoxes", boxes);
      this.$store.commit("modal/saveToLocal");
    }
  }
};
</script>
