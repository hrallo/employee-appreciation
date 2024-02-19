import Header from '@/components/Header'
import ProductLinks from '@/components/ProductLinks'
import { getProducts, getSiteContent } from './wordpress'

export default async function Home() {
  const { content } = await getSiteContent()
  const products = await getProducts()

  const homeContent = content?.acf.home

  return (
    <>
      <Header
        email={content?.acf.global.contact_email}
        phone={content?.acf.global.contact_phone}
        logo={content?.acf.global.logo}
      />
      <main className="flex-1 flex flex-col">
        <div className="md:flex py-12 px-6 md:px-12 md:justify-center md:items-center">
          {!!homeContent?.home_image && (
            <div className="flex justify-center mb-12 md:mb-0 md:mr-12">
              <img
                src={homeContent?.home_image.sizes.large}
                alt={homeContent?.home_image.alt ?? ''}
              />
            </div>
          )}
          <div className="text-center md:text-left">
            {homeContent?.home_heading && (
              <h1 className="text-2xl md:text-3xl mb-5">
                {homeContent.home_heading}
              </h1>
            )}
            {homeContent?.home_description && (
              <p
                className="text-base md:text-xl mb-10 max-w-[600px]"
                dangerouslySetInnerHTML={{
                  __html: homeContent.home_description,
                }}
              ></p>
            )}
            {homeContent?.home_tagline && (
              <p className="text-base md:text-xl font-bold">
                {homeContent.home_tagline}
              </p>
            )}
          </div>
        </div>
        <ProductLinks
          products={products}
          emailPlaceholder={content?.acf.global.verification_email_placeholder}
        />
      </main>
    </>
  )
}
