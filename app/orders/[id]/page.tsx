import Header from '@/components/Header'
import { getProducts, getSiteContent } from '../../wordpress'
import { cookies } from 'next/headers'
import PasswordPromptDialog from '../components/PasswordPromptDialog'
import EditOrder from '../components/EditOrder'

async function getOrder(id?: string): Promise<{
  order?: Order
  orderError?: string
}> {
  const res = await fetch(`${process.env.SITE_URL}/api/orders/id?id=${id}`, {
    method: 'GET',
    next: { tags: [`order-${id}`], revalidate: 300 },
  })

  if (!res.ok) {
    console.warn('Failed to fetch order')
    return { orderError: 'Failed to fetch order' }
  }

  const order: Order = await res.json()

  return {
    order,
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  const { content } = await getSiteContent()
  const products = await getProducts()

  const cookiesStore = cookies()
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!)
  const isLoggedIn = !!loginCookies?.value
  if (!isLoggedIn) {
    return <PasswordPromptDialog />
  }

  const { order, orderError } = await getOrder(params.id)

  if (!order || orderError)
    return (
      <Header
        email={content?.acf.global.contact_email}
        phone={content?.acf.global.contact_phone}
        logo={content?.acf.global.logo}
      />
    )

  return (
    <>
      <Header
        email={content?.acf.global.contact_email}
        phone={content?.acf.global.contact_phone}
        logo={content?.acf.global.logo}
      />
      <div className=" bg-alabaster min-h-screen p-4">
        <EditOrder order={order} products={products} />
      </div>
    </>
  )
}
