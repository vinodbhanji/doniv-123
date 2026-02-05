import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'

const app = express()
const __dirname = path.resolve()

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Success from API__' })
})

app.get('/books', (req, res) => {
  res.status(200).json({ msg: 'Success from BOOKS section' })
})

// bringing front end and backend code in the same url 5000 port for production purposeg
if (ENV.IS_PRODUCTION === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  // SPA fallback — Express 5 safe
  app.use('/{*any}',(req, res) => {
    res.sendFile(
      path.join(__dirname, '../frontend/dist/index.html')
    )
  })
}

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`)
})
