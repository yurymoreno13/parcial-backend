import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  image: String,
  active: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
