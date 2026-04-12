import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoute from './routes/auth.route'
import { connectDB } from './config/db'
import patientRoute from './routes/patient.route'
import professionalRoute from './routes/professional.route'
const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.json({
    message: 'CareNow backend is running',
  })
})

app.route('/api/auth', authRoute)
app.route('/api/patient', patientRoute)
app.route('/api/professional', professionalRoute)

const port = Number(process.env.PORT) || 3001

const startServer = async () => {
  await connectDB()

  console.log(`Server is running on http://localhost:${port}`)
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
export type AppType = typeof app

export default {
  port,
  fetch: app.fetch,
}