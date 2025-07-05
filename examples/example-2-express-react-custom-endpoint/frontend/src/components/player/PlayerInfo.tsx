import type { BasketballPlayer, Status } from './PlayerCard'

interface PlayerInfoProps {
  player: BasketballPlayer | null
  status: Status
}

const PlayerInfo = ({ player, status }: PlayerInfoProps) => {
  if (status === 'ok' && player) {
    return (
      <>
        <div>
          <b>{player.name}</b>
        </div>
        <div>ID: {player.id}</div>
      </>
    )
  }
  if (status === 'unauthorized') {
    return <div style={{ color: '#b00' }}>UNAUTHORIZED</div>
  }
  if (status === 'error') {
    return <div style={{ color: '#b00' }}>ERROR</div>
  }
  return <div>Loading...</div>
}

export default PlayerInfo
