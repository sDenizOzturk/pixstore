import { useAuth } from '../../store/auth'

interface LoginProps {
  userType: 'basketballPlayer' | 'generalManager' | 'federationStaff'
  count: number
  label: string
}

const LoginGrid = ({ userType, count, label }: LoginProps) => {
  const login = useAuth((s) => s.login)

  return (
    <div>
      <h3>{label}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${count > 5 ? 5 : count}, 1fr)`,
          gap: 16,
          justifyItems: 'center',
        }}
      >
        {Array.from({ length: count }, (_, i) => i + 1).map((id) => (
          <button key={id} onClick={() => login(userType, id)}>
            Login as ID {id}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LoginGrid
