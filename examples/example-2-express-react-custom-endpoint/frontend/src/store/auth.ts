import { create } from 'zustand'
import { API_BASE } from '../constants'

type UserType = 'basketballPlayer' | 'generalManager' | 'federationStaff'

interface AuthState {
  jwt: string | null
  userId: number | null
  userType: UserType | null
  login: (userType: UserType, id: number) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  jwt: null,
  userId: null,
  userType: null,
  login: async (userType, id) => {
    let endpoint = ''
    if (userType === 'basketballPlayer') endpoint = '/login/basketball-player'
    else if (userType === 'generalManager') endpoint = '/login/general-manager'
    else endpoint = '/login/federation-staff'

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    set({
      jwt: data.token,
      userId: data.user.id,
      userType: data.user.userType,
    })
  },
  logout: () => set({ jwt: null, userId: null, userType: null }),
}))
