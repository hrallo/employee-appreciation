import connectDB from '@/lib/conntectDB'
import order from '@/models/order'
import { revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.error()

  await connectDB()

  const orderById = await order.findOne({
    _id: id,
  })

  revalidateTag('orders')
  revalidateTag(`order-${id}`)

  return Response.json(orderById)
}

export async function PATCH(request: Request) {
  const body: Order = await request.json()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.error()

  await connectDB()

  const updatedOrder = await order.findOneAndUpdate(
    {
      _id: id,
    },
    body,
    {
      new: true,
    }
  )
  revalidateTag('orders')
  revalidateTag(`order-${id}`)

  return Response.json(updatedOrder)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.error()

  await connectDB()

  const deleted = await order.deleteOne({
    _id: id,
  })

  revalidateTag('orders')
  revalidateTag(`order-${id}`)

  return Response.json({ success: deleted.deletedCount === 1 })
}
