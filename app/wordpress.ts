async function getSiteContent(): Promise<{
  content?: Content
  contentError?: string
}> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/pages?slug=site-content-settings&acf_format=standard`,
    { next: { tags: ['content'], revalidate: 300 } }
  )

  if (!res.ok) {
    console.warn('Failed to fetch content')
    return { contentError: 'Failed to fetch content' }
  }

  const contents: Content[] = await res.json()

  return {
    content: contents?.[0],
  }
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/product?per_page=12&acf_format=standard`,
    { next: { tags: ['products'], revalidate: 300 } }
  )

  if (!res.ok) {
    console.warn('Failed to fetch products')
    return []
  }

  return res.json()
}

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
      next: { tags: [`product-${id}`], revalidate: 300 },
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
    `${process.env.WORDPRESS_URL}/location?per_page=12&acf_format=standard`
    // { next: { tags: ['locations'], revalidate: 300 } }
  )

  if (!res.ok) {
    console.warn('Failed to fetch locations')
    return { locations: [], locationsError: 'Failed to find locations' }
  }

  return { locations: await res.json() }
}

export { getSiteContent, getProducts, getProduct, getLocations }
