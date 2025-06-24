export interface RealMadridPlayerRecord {
  id: string;
  name: string;
  birthDate: string;
  position: string;
  imageId: string;
}

const players: RealMadridPlayerRecord[] = [];

export function insertPlayer(player: RealMadridPlayerRecord) {
  players.push(player);
}

export function getAllPlayers(): RealMadridPlayerRecord[] {
  return players;
}
