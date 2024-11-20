import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import homeRoutes from './routes/homeRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/', homeRoutes)

console.log("AWS_REGION:", process.env.AWS_REGION)
console.log("ACCESS_KEY_ID:", process.env.ACCESS_KEY_ID)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
