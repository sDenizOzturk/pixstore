import { BasketballTeam } from '../models/basketball-team'
import { BasketballPlayerRecord } from '../models/basketball-player'
import { GeneralManager } from '../models/general-manager'
import { FederationStaff } from '../models/federation-staff'

// In-memory arrays for all entities
const teams: BasketballTeam[] = []
const players: BasketballPlayerRecord[] = []
const generalManagers: GeneralManager[] = []
const federationStaff: FederationStaff[] = []

// Add functions
export const addTeam = (team: BasketballTeam) => {
  teams.push(team)
}

export const addPlayer = (player: BasketballPlayerRecord) => {
  players.push(player)
}

export const addGeneralManager = (manager: GeneralManager) => {
  generalManagers.push(manager)
}

export const addFederationStaff = (staff: FederationStaff) => {
  federationStaff.push(staff)
}

// Get functions (lookup by id)
export const getTeamById = (id: number): BasketballTeam | undefined => {
  return teams.find((team) => team.id === id)
}

export const getPlayerById = (
  id: number,
): BasketballPlayerRecord | undefined => {
  return players.find((player) => player.id === id)
}

export const getPlayersByTeamId = (
  teamId: number,
): BasketballPlayerRecord[] => {
  return players.filter((player) => player.teamId === teamId)
}

export const getGeneralManagerById = (
  id: number,
): GeneralManager | undefined => {
  return generalManagers.find((gm) => gm.id === id)
}

export const getGeneralManagerByTeamId = (
  teamId: number,
): GeneralManager | undefined => {
  return generalManagers.find((mgr) => mgr.teamId === teamId)
}

export const getFederationStaffById = (
  id: number,
): FederationStaff | undefined => {
  return federationStaff.find((staff) => staff.id === id)
}
