import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, res) => res.json({ ok: true, service: 'backend' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dosinterfaces'

// 🟢 Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    // Detecta si es una conexión a Atlas (tiene "mongodb+srv")
    if (MONGO_URI.startsWith('mongodb+srv://')) {
      console.log('✅ Conectado a MongoDB Atlas con éxito.')
    } else {
      console.log('✅ Conectado a MongoDB local.')
    }

    app.listen(PORT, () => {
      console.log(`🚀 API ejecutándose en http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err.message)
    process.exit(1)
  })
