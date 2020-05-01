<template>
  <v-container @mousemove.stop="onmousemove" @mouseup="up">
    <v-row>
      <v-col cols="12">
        <div
          v-for="(item, index) in boxes"
          :key="index"
          :item="item"
          :style="{
            width: item.width + 'px',
            height: item.heigth + 'px',
            top: item.y + 'px',
            left: item.x + 'px',
            zIndex: item.z + ''
          }"
          class="box"
        >
          <div class="box-wrapper">
            <div
              class="top-border border"
              @mousedown.self="expand(index, 'top')"
              @mouseup.self="up"
            ></div>
            <div class="inner-container">
              <div
                class="left-border border"
                @mouseup.self="up"
                @mousedown.self="expand(index, 'left')"
              ></div>
              <div class="mx-auto" @mousedown="down(index, $event)">
                <v-card outlined>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">
                        Title
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>
              <div
                class="right-border border"
                @mousedown.self="expand(index, 'right')"
                @mouseup.self="up"
              ></div>
            </div>
            <div
              class="bottom-border border"
              @mousedown.self="expand(index, 'bottom')"
              @mouseup.self="up"
            ></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Modals",
  data: function() {
    return {
      clickedOn: false,
      clickedOnCoords: [],
      clickedExpand: false,
      maxZindex: 4,
      boxes: [
        { width: 300, heigth: 50, x: 356, y: 40, z: 1 },
        { width: 300, heigth: 50, x: 476, y: 130, z: 2 },
        { width: 300, heigth: 50, x: 340, y: 300, z: 3 },
        { width: 300, heigth: 50, x: 0, y: 300, z: 4 }
      ]
    };
  },
  mounted() {
    const boxes = JSON.parse(localStorage.getItem("boxes"));
    if (boxes) {
      this.boxes = boxes;
    }
  },
  methods: {
    expandAt(e) {
      if (this.direction === false) return;
      let boxes = this.boxes;
      const box = boxes[this.clickedExpand];
      let diff;
      switch (this.direction) {
        case "top":
          diff = e.pageY - box.y;
          box.heigth += -diff;
          box.y = e.pageY;
          break;
        case "bottom":
          diff = e.pageY - box.y;
          box.heigth = diff;
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
      this.boxes = [...boxes];
    },
    onmousemove(e) {
      if (this.clickedOn !== false) this.moveAt(e);
      if (this.clickedExpand !== false) this.expandAt(e);
    },
    expand(index, dir) {
      this.direction = dir;
      this.clickedExpand = index;
    },
    moveAt(e) {
      let boxes = this.boxes;
      const box = boxes[this.clickedOn];
      box.x = e.pageX - this.clickedOnCoords[0];
      box.y = e.pageY - this.clickedOnCoords[1];
      this.boxes = [...boxes];
    },
    down(index, ev) {
      this.clickedOn = index;
      this.clickedOnCoords = [ev.layerX, ev.layerY];
      let boxes = this.boxes;
      const box = boxes[this.clickedOn];
      boxes = boxes.map(b => {
        if (b.z >= box.z && b.z > 1) b.z--;
        return b;
      });
      box.z = this.maxZindex;
      this.boxes = [...boxes];
    },
    up() {
      this.direction = false;
      this.clickedOn = false;
      this.clickedExpand = false;
      this.clickedOnCoords = [];
      this.saveToLocal();
    },
    saveToLocal() {
      localStorage.setItem("boxes", JSON.stringify(this.boxes));
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
.top-border,
.bottom-border {
  border-top: 3px solid black;
  cursor: ns-resize;
}
.left-border,
.right-border {
  border-right: 3px solid black;
  cursor: ew-resize;
  width: 0;
}
</style>
