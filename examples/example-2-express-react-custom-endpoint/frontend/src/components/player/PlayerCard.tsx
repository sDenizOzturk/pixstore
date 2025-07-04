// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { getImage } from '../../../../../../dist/frontend/'
import type { ImageRecord } from '../../../../../../dist/types'

import { useState, useEffect } from 'react'
import { useAuth } from '../../store/auth'
import { API_BASE } from '../../constants'
import PlayerImageBox from './PlayerImageBox'
import PlayerInfo from './PlayerInfo'
import PlayerCardWrapper from './PlayerCardWrapper'

export interface BasketballPlayer {
  id: number
  name: string
  // ImageRecord describes the metadata needed to access an image.
  imageRecord: ImageRecord
  teamId: number
}

export type Status = 'ok' | 'unauthorized' | 'error' | 'loading'

const PlayerCard = ({ id }: { id: number }) => {
  const { jwt } = useAuth()

  const [player, setPlayer] = useState<BasketballPlayer | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    if (!jwt) {
      setStatus('unauthorized')
      setPlayer(null)
      setImageUrl('')
      return
    }

    setStatus('loading')
    setPlayer(null)
    setImageUrl('')

    const fetchPlayer = async () => {
      try {
        const res = await fetch(`${API_BASE}/player/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        if (res.ok) {
          const playerData: BasketballPlayer = await res.json()
          setPlayer(playerData)
          setStatus('ok')

          if (playerData.imageRecord) {
            try {
              // Fetches and decrypts the player image from the Pixstore backend using the provided imageRecord.
              // The playerId is passed as context for access control on the backend.
              const imgData = await getImage(playerData.imageRecord, {
                playerId: playerData.id,
              })
              const blob = new Blob([imgData!])
              setImageUrl(URL.createObjectURL(blob))
              return true
            } catch {
              setImageUrl('')
            }
          }
        } else if (res.status === 403 || res.status === 401) {
          setStatus('unauthorized')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    }
    fetchPlayer()
  }, [jwt, id])

  return (
    <PlayerCardWrapper status={status}>
      <PlayerImageBox
        imageUrl={imageUrl}
        status={status}
        alt={player?.name || `Player ${id}`}
      />
      <PlayerInfo player={player} status={status} />
    </PlayerCardWrapper>
  )
}
export default PlayerCard
