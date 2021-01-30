import { modalStore } from "./modalStore";
import { bitcoinStore } from "./bitcoinStore";

export const store = {
  modules: {
    modal: modalStore,
    bitcoin: bitcoinStore
  }
};
