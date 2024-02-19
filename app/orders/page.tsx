import Header from '@/components/Header'
import { getSiteContent } from '../wordpress'
import { cookies } from 'next/headers'
import PasswordPromptDialog from './components/PasswordPromptDialog/PasswordPromptDialog'
import OrderTable from './components/PasswordPromptDialog/OrderTable'
import Csv from './components/CSV/Csv'

async function getOrders(): Promise<{
  orders?: Order[]
  orderError?: string
}> {
  const res = await fetch(`${process.env.SITE_URL}/api/orders`, {
    method: 'GET',
    next: { tags: ['orders'], revalidate: 300 },
  })

  if (!res.ok) {
    console.warn('Failed to fetch orders')
    return { orderError: 'Failed to fetch orders' }
  }

  const orders: Order[] = await res.json()

  return {
    orders,
  }
}

export default async function Home() {
  const { content } = await getSiteContent()

  const cookiesStore = cookies()
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!)
  const isLoggedIn = !!loginCookies?.value
  if (!isLoggedIn) {
    return <PasswordPromptDialog />
  }

  const { orders, orderError } = await getOrders()

  if (!orders || orderError)
    return (
      <>
        <Header
          email={content?.acf.global.contact_email}
          phone={content?.acf.global.contact_phone}
          logo={content?.acf.global.logo}
        />
      </>
    )

  return (
    <>
      <Header
        email={content?.acf.global.contact_email}
        phone={content?.acf.global.contact_phone}
        logo={content?.acf.global.logo}
      />
      <main className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl">Orders</h1>
          <Csv orders={orders} />
        </div>

        <OrderTable orders={orders} />
      </main>
    </>
  )
}
