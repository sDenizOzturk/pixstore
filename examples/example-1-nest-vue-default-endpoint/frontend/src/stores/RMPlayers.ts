import { defineStore } from 'pinia'
// In real-world projects, you should install Pixstore via npm and import as:
//
//   import { getImageRecord } from 'pixstore/types'
//
import type { ImageRecord } from '../../../../../dist/types'
import { apolloClient } from '../apolloClient'
import { gql } from '@apollo/client/core'

// Player type for this Real Madrid example.
// Note: pixstoreImage is a full Pixstore record, not a URL.
export interface RealMadridPlayer {
  id: string
  name: string
  birthDate: string
  position: string
  pixstoreImage: ImageRecord
}

// Pinia store for managing Real Madrid player list and selection state.
// Handles fetching data via GraphQL and tracking loading/error state.
export const useRMPlayersStore = defineStore('RMPlayers', {
  state: () => ({
    players: [] as RealMadridPlayer[], // All loaded players
    currentPlayerID: null as string | null, // ID of currently selected player
    loading: false, // Is fetch in progress?
    error: null as string | null, // Last fetch error (if any)
  }),
  actions: {
    // Fetch all player records (with associated Pixstore image record) from backend GraphQL API.
    // On success, sets players and auto-selects the first player.
    async fetchPlayers() {
      this.loading = true
      this.error = null

      try {
        const { data } = await apolloClient.query<{
          players: RealMadridPlayer[]
        }>({
          query: gql`
            query {
              players {
                id
                name
                position
                birthDate
                pixstoreRecord {
                  id
                  token
                  meta {
                    key
                    iv
                    tag
                  }
                }
              }
            }
          `,
          fetchPolicy: 'network-only',
        })

        // NOTE: The backend returns pixstoreRecord, which matches our pixstoreImage field.
        // We simply assign data directly, but in a more general app you may want to map field names.
        this.players = data.players
        this.currentPlayerID = this.players[0]?.id ?? null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.error = err.message || 'Unknown error'
      } finally {
        this.loading = false
      }
    },

    // Set the selected player by ID (used when clicking a player card)
    setCurrentPlayer(id: string) {
      this.currentPlayerID = id
    },
  },
})
