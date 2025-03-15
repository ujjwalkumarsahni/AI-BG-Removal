import 'dotenv/config'
import express from 'express'
import cors from 'cors'

// express initialization
const app = express()

// port initialization
const port = process.env.PORT || 3000

// middleware initialization
app.use(express.json())
app.use(cors())


// api routes
app.get('/', (req, res) => res.send('API Working'))


app.listen(port, () => console.log(`Server running on port ${port}`));
