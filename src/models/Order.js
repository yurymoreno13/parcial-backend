import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Referencia al usuario (para poder hacer populate)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // Campos opcionales para guardar el nombre y correo
  // al momento de crear la orden (snapshot)
  userName: { type: String },
  userEmail: { type: String },

  // Lista de ítems en la orden
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    qty: { 
      type: Number, 
      required: true, 
      default: 1 
    }
  }],

  // Total de la orden
  total: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

// Exportar modelo
export default mongoose.model("Order", orderSchema);
