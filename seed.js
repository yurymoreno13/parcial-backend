import 'dotenv/config'
import mongoose from 'mongoose'
import Product from './src/models/Product.js'
import User from './src/models/User.js'
import bcrypt from 'bcryptjs'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dosinterfaces'
await mongoose.connect(MONGO_URI)

await Product.deleteMany({})
await User.deleteMany({})

await Product.insertMany([
  { title: 'P1 - Papitas', price: 8000, image: 'https://picsum.photos/seed/p1/300/200', active: true },
  { title: 'P2 - Limonada', price: 6000, image: 'https://picsum.photos/seed/p2/300/200', active: true },
  { title: 'P3 - Combo', price: 15000, image: 'https://picsum.photos/seed/p3/300/200', active: true },
  { title: 'P4 - Agotado demo', price: 7000, image: 'https://picsum.photos/seed/p4/300/200', active: false },
])

const adminPass = await bcrypt.hash('admin123', 10)
await User.create({ name:'Admin', email:'admin@demo.com', passwordHash: adminPass, role:'admin' })

console.log('Seed ok. Admin: admin@demo.com / admin123')
process.exit(0)
