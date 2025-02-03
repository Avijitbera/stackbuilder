import express from 'express'
import authRouter from './router/auth.router'
import projectRouter from './router/project.router'


const app = express()
app.use(express.json())
const PORT  = process.env.PORT || 5000

app.use("/api/auth", authRouter)
app.use("/api/project", projectRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

