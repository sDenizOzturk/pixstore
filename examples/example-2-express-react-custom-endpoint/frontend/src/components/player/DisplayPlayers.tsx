import PlayerCard from './PlayerCard'

const DisplayPlayers = () => {
  return (
    <div>
      <h3>Player List</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
          justifyItems: 'center',
        }}
      >
        {
          // NOTE: This is not an optimal design—player IDs are hardcoded for demo purposes.
          // The goal is to demonstrate Pixstore integration, not dynamic or scalable data fetching.
        }
        {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => (
          <PlayerCard key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default DisplayPlayers
