<script setup lang="ts">
import { onMounted } from 'vue'
import { useRMPlayersStore } from '@/stores/RMPlayers'
import RMPlayerItem from './RMPlayerItem.vue'

const store = useRMPlayersStore()

onMounted(() => {
  if (store.players.length === 0) {
    store.fetchPlayers()
  }
})
</script>

<template>
  <div>
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div v-else class="players-list">
      <RMPlayerItem v-for="player in store.players" :key="player.id" :id="player.id" />
    </div>
  </div>
</template>

<style scoped>
.players-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
