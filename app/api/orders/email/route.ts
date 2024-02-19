import connectDB from '@/lib/conntectDB'
import order from '@/models/order'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) return Response.json({ canPlaceOrder: false })

  await connectDB()

  const orderForEmail = await order.findOne({
    receiverEmail: email,
  })

  return Response.json({ canPlaceOrder: !orderForEmail, order: orderForEmail })
}
