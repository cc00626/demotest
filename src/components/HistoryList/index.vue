<template>
  <div v-for="(item, index) in props.data" :key="index">
    <HistoryItem :item="item" @click="slowMessage(item.sessionId)" />
    <!-- {{ }} -->
  </div>
</template>
<script setup lang="ts">
import HistoryItem from './HistoryItem/index.vue'
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/store/chat'
const chatStore = useChatStore()
const props = defineProps({
  data: {
    type: Array,
    // default: () => { }
  }
})

const slowMessage = (id: any) => {
  console.log(id)
  chatStore.getChatListByHistory(id)
}

onMounted(() => {
  console.log(props.data)
})
</script>
<style scoped lang="scss">
.history-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>