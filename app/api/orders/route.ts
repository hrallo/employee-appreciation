import connectDB from '@/lib/conntectDB'
import order from '@/models/order'

export async function POST(request: Request) {
  const body = await request.json()
  await connectDB()
  const newOrder = new order(body)
  await newOrder.save()

  return Response.json({ newOrder })
}

export async function GET(request: Request) {
  await connectDB()
  const orders = await order.find()
  return Response.json(orders)
}
