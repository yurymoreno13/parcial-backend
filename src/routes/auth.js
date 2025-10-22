import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = Router()

router.post('/register', async (req,res)=>{
  try{
    const { name, email, password, role } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({error:'Email already registered'})
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, role: role==='admin'?'admin':'user' })
    res.json({ id:user._id, email:user.email })
  }catch(e){ res.status(500).json({error:e.message}) }
})

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({error:'Invalid credentials'})
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(400).json({error:'Invalid credentials'})
    const token = jwt.sign({ uid:user._id, role:user.role, name:user.name }, process.env.JWT_SECRET, { expiresIn:'7d' })
    res.json({ token, role:user.role, name:user.name })
  }catch(e){ res.status(500).json({error:e.message}) }
})

export default router
