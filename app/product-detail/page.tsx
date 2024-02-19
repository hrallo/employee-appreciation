import Header from '@/components/Header'
import ProductImages from './components/ProductImages'
import ProductError from './components/error'
import Form from './components/form.tsx/form'
import { getLocations, getProduct, getSiteContent } from '../wordpress'

export default async function ProductDetail({
  searchParams,
}: {
  searchParams?: { [key: string]: string }
}) {
  const email = searchParams?.email
  const { content } = await getSiteContent()
  const { product, error } = await getProduct(searchParams?.productId)
  const { locations, locationsError } = await getLocations()

  const pageHeader = (
    <Header
      email={content?.acf.global.contact_email}
      phone={content?.acf.global.contact_phone}
      logo={content?.acf.global.logo}
    />
  )

  if (error || !product || locationsError) {
    return (
      <>
        {pageHeader}
        <ProductError message={error} />
      </>
    )
  }

  if (!email) {
    return (
      <>
        {pageHeader}
        <ProductError
          message={'Please provide your company email to order this product.'}
        />
      </>
    )
  }

  return (
    <>
      {pageHeader}
      <main className="grid grid-cols-1 md:grid-cols-2 flex-1 md:h-screen">
        <div className="p-3 md:pt-12">
          <ProductImages
            featured={product.acf.featured_image}
            supportingImage1={product.acf.supporting_image_1}
            supportingImage2={product.acf.supporting_image_2}
            supportingImage3={product.acf.supporting_image_3}
          />
        </div>
        <div className="bg-alabaster overflow-y-auto">
          <Form
            product={product}
            locations={locations}
            content={content?.acf.order_details}
            email={email}
          />
        </div>
      </main>
    </>
  )
}
