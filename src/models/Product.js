import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  price:  { type: Number, required: true },
  active: { type: Boolean, default: true },
  image:  { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
