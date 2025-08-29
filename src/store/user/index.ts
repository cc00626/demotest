import { defineStore } from "pinia";
import { ref } from "vue";
const useUserStore = defineStore("user", () => {
  const username = ref("");
  const password = ref("");
});
