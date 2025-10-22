import { Router } from 'express'
import Order from '../models/Order.js'
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

router.post('/', auth, async (req, res)=>{
  // body: { items: [{product: productId, qty}] }
  const items = req.body.items || []
  let total = 0
  for(const it of items){
    const p = await Product.findById(it.product)
    if(p) total += (p.price || 0) * (it.qty || 1)
  }
  const order = await Order.create({ user: req.user.uid, items, total })
  res.json(order)
})

router.get('/mine', auth, async (req, res)=>{
  const orders = await Order.find({ user: req.user.uid }).populate('items.product','title price')
  res.json(orders)
})

router.get('/', auth, async (req, res)=>{
  if(req.user.role!=='admin') return res.status(403).json({error:'Admins only'})
  const orders = await Order.find().populate('user','name email').populate('items.product','title price')
  res.json(orders)
})

export default router
