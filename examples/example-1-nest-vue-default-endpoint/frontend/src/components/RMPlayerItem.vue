<script setup lang="ts">
import { computed } from 'vue'
import { useRMPlayersStore } from '@/stores/RMPlayers'

const props = defineProps<{
  id: string
}>()

const store = useRMPlayersStore()
const player = computed(() => store.players.find((p) => p.id === props.id))

// Checks if this player is currently selected
const isSelected = computed(() => store.currentPlayerID === props.id)

function selectThisPlayer() {
  store.setCurrentPlayer(props.id)
}
</script>

<template>
  <div
    :style="{
      border: isSelected ? '2px solid #1976d2' : '1px solid #aaa',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      background: isSelected ? '#e3f2fd' : '#fff',
      fontWeight: isSelected ? 'bold' : 'normal',
      transition: 'all 0.1s',
    }"
    @click="selectThisPlayer"
  >
    {{ player?.name || 'Unknown' }}
  </div>
</template>
