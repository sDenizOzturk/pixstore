<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRMPlayersStore } from '@/stores/RMPlayers'
// IMPORTANT: In this example, Pixstore types are imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { getImage } from 'pixstore/frontend'
//
import { getImage } from '../../../../../dist/frontend'
//
//   import { ImageRecord } from 'pixstore/types'
//
import type { ImageRecord } from '../../../../../dist/types'

const store = useRMPlayersStore()

const player = computed(() => store.players.find((p) => p.id === store.currentPlayerID))

const imageUrl = ref<string | null>(null)

watch(
  player,
  async (p) => {
    if (p && p.pixstoreRecord) {
      // Fetches the image Blob from Pixstore using the full image record (not just a URL).
      // This design lets the frontend handle image caching, validation, and all fetch logic locally,
      // instead of relying on simple static URLs. It's what enables advanced features like token-based access.
      const blob: Blob = await getImage(p.pixstoreRecord as ImageRecord)
      imageUrl.value = URL.createObjectURL(blob)
    } else {
      imageUrl.value = null
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="player" class="player-detail-card">
    <img v-if="imageUrl" :src="imageUrl" alt="player image" class="player-image" />
    <h2>{{ player.name }}</h2>
    <p>{{ player.birthDate }}</p>
    <p>{{ player.position }}</p>
    <p>
      <small>ID: {{ player.id }}</small>
    </p>
    <p>
      <small>Token: {{ player.pixstoreRecord.token }}</small>
    </p>
  </div>
  <div v-else>
    <em>No player selected.</em>
  </div>
</template>

<style scoped>
.player-detail-card {
  border: 2px solid #1976d2;
  border-radius: 12px;
  padding: 24px;
  background: #f8faff;
  max-width: 320px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.player-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>
