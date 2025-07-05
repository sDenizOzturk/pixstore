import express from 'express'
import cors from 'cors'

import { initPixstore } from './store/init-pixstore'
import { seedDatabase } from './store/seed-database'

import { loginRouter } from './routes/login'
import { playerRouter } from './routes/player'
import { playerImageRouter } from './routes/player-image'
import { PORT } from './constants'
;(async () => {
  // Initializes Pixstore backend (removes old DB/files, sets up new config)
  initPixstore()
  // Seeds in-memory database from filesystem and adds images via Pixstore
  await seedDatabase()

  const app = express()
  app.use(express.json())

  app.use(cors({ origin: 'http://localhost:5173' }))
  app.use(express.json())

  app.use('/login', loginRouter)
  app.use('/player', playerRouter)
  app.use('/player-image', playerImageRouter)

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
  })
})()
