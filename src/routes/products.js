import { Router } from 'express'
import Product from '../models/Product.js'
import jwt from 'jsonwebtoken'

const router = Router()

function auth(req, res, next){
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if(!token) return res.status(401).json({error:'No token'})
  try{
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  }catch(e){ return res.status(401).json({error:'Invalid token'}) }
}

router.get('/', async (_req, res)=>{
  const items = await Product.find({active:true}).sort({createdAt:-1})
  res.json(items)
})

router.get('/all', auth, async (_req, res)=>{
  const items = await Product.find().sort({createdAt:-1})
  res.json(items)
})

router.post('/', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({error:'Admins only'})
  const p = await Product.create(req.body)
  res.json(p)
})

router.patch('/:id', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({error:'Admins only'})
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(p)
})

router.delete('/:id', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({error:'Admins only'})
  await Product.findByIdAndDelete(req.params.id)
  res.json({ok:true})
})

export default router
