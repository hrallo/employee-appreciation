import ProductImages from './components/ProductImages'
import ProductError from './components/error'
import Form from './components/form.tsx/form'

async function getProduct(
  id?: string
): Promise<{ product?: Product; error?: string }> {
  if (!id)
    return {
      error: 'Please select your product from the home page.',
    }

  const res = await fetch(
    `${process.env.WORDPRESS_URL}/product/${id}?acf_format=standard`,
    {
      next: { tags: [`product-${id}`] },
    }
  )

  if (!res.ok) {
    console.error('Failed to fetch products')
    return {
      error: 'Could not find product',
    }
  }

  return { product: await res.json() }
}

async function getLocations(): Promise<{
  locations: Address[]
  locationsError?: string
}> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/location?per_page=12&acf_format=standard`,
    { next: { tags: ['locations'] } }
  )

  if (!res.ok) {
    console.warn('Failed to fetch locations')
    return { locations: [], locationsError: 'Failed to find locations' }
  }

  return { locations: await res.json() }
}

export default async function ProductDetail({
  searchParams,
}: {
  searchParams?: { [key: string]: string }
}) {
  const { product, error } = await getProduct(searchParams?.productId)
  const { locations } = await getLocations()

  if (error || !product) {
    return <ProductError message={error} />
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
      <div className="p-3">
        <ProductImages
          featured={product.acf.featured_image}
          supportingImage1={product.acf.supporting_image_1}
          supportingImage2={product.acf.supporting_image_2}
          supportingImage3={product.acf.supporting_image_3}
        />
      </div>
      <div className="bg-alabaster overflow-y-auto">
        <Form product={product} locations={locations} />
      </div>
    </main>
  )
}
