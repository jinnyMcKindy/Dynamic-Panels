<template>
  <v-container @mousemove.stop="onmousemove" @mouseup="up">
    <v-row>
      <v-col cols="12">
        <router-link class="nav-link nav-link--light" :to="{ name: 'bitcoin' }">
          Go to Bitcoins
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Box
          v-for="item in boxes"
          :id="item.id"
          :key="item.id"
          draggable="true"
          :item="item"
          :data-id="item.id"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn v-if="deleted" small color="warning" @click="addBox"
          >Вернуть</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Box from "./Box";
import { mapState } from "vuex";

function getCoords(elem) {
  // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
export default {
  name: "Modals",
  components: {
    Box
  },
  data: function() {
    return { dragged: null, shiftY: null, shiftX: null };
  },
  computed: {
    ...mapState("modal", [
      "boxes",
      "clickedOn",
      "clickedExpand",
      "direction",
      "clickedOnCoords",
      "deleted"
    ])
  },
  mounted() {
    const boxes = JSON.parse(localStorage.getItem("boxes"));
    const deleted = JSON.parse(localStorage.getItem("deleted"));
    if (boxes) {
      this.$store.dispatch("modal/setBoxes", boxes);
    }
    if (deleted) {
      this.$store.commit("modal/setDeleted", deleted);
    }
    document.addEventListener("dragstart", this.onDragStart, false);
    document.addEventListener("dragover", this.onDragover, false);
    document.addEventListener("drop", this.onDrop, false);
  },
  beforeDestroy() {
    document.removeEventListener("dragstart", this.onDragStart);
    document.removeEventListener("dragover", this.onDragover);
    document.removeEventListener("drop", this.onDrop);
  },
  methods: {
    onmousemove(e) {
      if (this.clickedExpand !== false) this.expandAt(e);
    },
    onDragStart(event) {
      this.dragged = event.target;
      const { left, top } = getCoords(event.target);
      this.shiftY = event.pageY - top;
      this.shiftX = event.pageX - left;
    },
    onDragover(event) {
      event.preventDefault();
    },
    onDrop(event) {
      event.preventDefault();
      if (event.type == "drop") {
        const id = parseInt(this.dragged.getAttribute("data-id"));
        const box = {
          x: event.pageX - this.shiftX,
          y: event.pageY - this.shiftY
        };
        this.$store.dispatch("modal/setBox", { box, id });
        this.$store.commit("modal/saveToLocal");
      }
    },
    up() {
      this.$store.commit("modal/clear");
    },
    expandAt(e) {
      if (this.direction === false) return;
      let boxes = this.boxes;
      const box = boxes.filter(
        b => parseInt(b.id) === parseInt(this.clickedExpand)
      )[0];
      let diff;
      switch (this.direction) {
        case "top":
          diff = e.pageY - box.y;
          box.height += -diff;
          box.y = e.pageY;
          break;
        case "bottom":
          diff = e.pageY - box.y;
          box.height = diff;
          break;
        case "left":
          diff = e.pageX - box.x;
          box.width += -diff;
          box.x = e.pageX;
          break;
        case "right":
          diff = e.pageX - box.x;
          box.width = diff;
          break;
      }
      this.$store.dispatch("modal/setBoxes", boxes);
    },
    addBox() {
      const width = 300;
      const height = 50;
      const boxes = this.boxes;
      let maxId = 0;
      boxes.forEach(element => {
        element.id > maxId ? (maxId = element.id) : null;
      });
      maxId++;
      boxes.push({
        width,
        height,
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2,
        z: 5,
        id: maxId
      });
      const deleted = this.deleted - 1;
      this.$store.commit("modal/setDeleted", deleted);
      this.$store.dispatch("modal/setBoxes", boxes);
    }
  }
};
</script>
<style>
.container {
  height: 100%;
}
.box {
  position: absolute;
}
.inner-container {
  display: flex;
  height: 100%;
}
.box-wrapper {
  height: 100%;
  -webkit-box-shadow: -1px 4px 61px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: -1px 4px 61px 0px rgba(34, 60, 80, 0.2);
  box-shadow: -1px 4px 61px 0px rgba(34, 60, 80, 0.2);
}
.mx-auto {
  cursor: move;
  width: 100%;
  background: white;
  overflow: hidden;
}
.border {
  width: 100%;
}
.overline {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  z-index: 6;
}
.top-border,
.bottom-border {
  border-top: 1px solid rgba(34, 60, 80, 0.2);
  cursor: ns-resize;
}
.left-border,
.right-border {
  border-right: 1px solid rgba(34, 60, 80, 0.2);
  cursor: ew-resize;
  width: 0;
}
.theme--light.v-card.v-card--outlined {
  border: none;
}
</style>
