import { defineStore } from "pinia";

const usePlayerListStore = defineStore("playerList", {
  state: () => ({
    playerList: [],
    self: [],
  }),
  actions: {},
});

export default usePlayerListStore;
