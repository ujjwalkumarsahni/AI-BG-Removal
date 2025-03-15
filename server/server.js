import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

// express initialization
const app = express()

// database connection
connectDB()


// middleware initialization
app.use(express.json())
app.use(cors())


// api routes
app.get('/', (req, res) => res.send('API Working'))
app.use('/api/user',userRouter)






// port initialization
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`));
