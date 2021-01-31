export const modalStore = {
  namespaced: true,
  state: {
    boxes: [
      { width: 300, height: 50, x: 356, y: 40, z: 1, id: 1 },
      { width: 300, height: 50, x: 476, y: 130, z: 2, id: 2 },
      { width: 300, height: 50, x: 340, y: 300, z: 3, id: 3 },
      { width: 300, height: 50, x: 0, y: 300, z: 4, id: 4 }
    ],
    deleted: 0,
    clickedOn: false,
    clickedOnCoords: [],
    clickedExpand: false,
    maxZindex: 4,
    direction: null,
    deletedKey: null
  },
  mutations: {
    setBox(state, { box, id }) {
      state.boxes = [
        ...state.boxes.map(b => {
          if (b.id == id) {
            b.x = box.x;
            b.y = box.y;
          }
          return b;
        })
      ];
    },
    setBoxes(state, boxes) {
      state.boxes = [...boxes];
    },
    setDeleted(state, deleted, key) {
      state.deleted = deleted;
      state.deletedKey = key;
    },
    setClickedOn(state, clickedOn) {
      state.clickedOn = clickedOn;
    },
    setClickedOnCoords(state, clickedOnCoords) {
      state.clickedOnCoords = clickedOnCoords;
    },
    setClickedExpand(state, clickedExpand) {
      state.clickedExpand = clickedExpand;
    },
    setMaxZindex(state, maxZindex) {
      state.maxZindex = maxZindex;
    },
    clear(state) {
      state.direction = false;
      state.clickedOn = false;
      state.clickedExpand = false;
      state.clickedOnCoords = [];
    },
    saveToLocal(state) {
      localStorage.setItem("deleted", JSON.stringify(state.deleted));
      localStorage.setItem("boxes", JSON.stringify(state.boxes));
    },
    setDirection(state, dir) {
      state.direction = dir;
    },
    down(state, index) {
      state.clickedOn = index;
      let boxes = [...state.boxes];
      const box = boxes.filter(b => parseInt(b.id) === parseInt(index));
      boxes = boxes.map(b => {
        if (b.z >= box.z && parseInt(b.id) !== parseInt(state.clickedOn)) b.z--;
        return b;
      });
      box.z = state.maxZindex;
      state.boxes = boxes;
    }
  },
  actions: {
    setBoxes({ commit }, boxes) {
      commit("setBoxes", boxes);
      commit("saveToLocal");
    },
    down({ commit }, index) {
      commit("down", index);
      commit("saveToLocal");
    },
    setBox({ commit }, { box, id }) {
      commit("setBox", { box, id });
      commit("saveToLocal");
    }
  }
};
