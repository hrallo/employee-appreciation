import mongoose from 'mongoose'

const Order = new mongoose.Schema(
  {
    product: String,
    receiverName: String,
    receiverEmail: String,
    size: String,
    color: String,
    isRemote: Boolean,
    shippingAddress: {
      attn: String,
      addressName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      stateOrProvince: String,
      zipcode: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Order || mongoose.model('Order', Order)
