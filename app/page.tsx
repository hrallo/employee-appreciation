import ProductLinks from '@/components/ProductLinks'
import Image from 'next/image'

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/product?per_page=12&acf_format=standard`,
    { next: { tags: ['products'] } }
  )

  if (!res.ok) {
    console.warn('Failed to fetch products')
    return []
  }

  return res.json()
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="flex-1 flex flex-col">
      <div className="text-center py-12 px-6 md:px-12">
        <div className="flex justify-center">
          <Image
            className="mb-12"
            src="/logo.svg"
            alt="Hussman Logo"
            width={600}
            height={58}
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl mb-5">Employee Appreciation</h1>
        <p className="text-base md:text-2xl mb-10 max-w-[600px] mx-auto">
          {new Date().getFullYear()} Raffle Selections are here. Please select
          an item and we will ship it shortly.
        </p>
        <p className="text-base md:text-2xl font-bold">You Are Appreciated!</p>
      </div>
      <ProductLinks products={products} />
    </main>
  )
}
