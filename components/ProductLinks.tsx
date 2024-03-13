'use client'
import { FC, ReactElement, useState } from 'react'
import ProductButton from './ProductButton'
import EmailConfirmation from './EmailConfirmation'

type ProductLinksProps = {
  products: Product[]
  emailPlaceholder?: string
  shouldVerifyDomain?: boolean
}

const ProductLinks: FC<ProductLinksProps> = ({
  products,
  emailPlaceholder,
  shouldVerifyDomain,
}): ReactElement => {
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const scrollToHash = function (elId: string) {
    const element = document.getElementById(elId)
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  return (
    <>
      <div className={['pb-4 md:py-10 px-6'].join(' ')}>
        <h2 className="text-center text-base md:text-xl font-bold">
          The raffle for 2024 is closed. {"We'll"} see you next year!
        </h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
          {products.map((product, idx) => (
            <ProductButton
              key={idx}
              selected={selectedProduct?.id === product.id}
              product={product}
              onSelectProduct={product => {
                setSelectedProduct(product)
                setTimeout(() => {
                  scrollToHash('emailConfirmation')
                }, 200)
              }}
            />
          ))}
        </div> */}
      </div>
      {selectedProduct && (
        <EmailConfirmation
          product={selectedProduct}
          placeholder={emailPlaceholder}
          shouldVerifyDomain={shouldVerifyDomain}
        />
      )}
    </>
  )
}

export default ProductLinks
