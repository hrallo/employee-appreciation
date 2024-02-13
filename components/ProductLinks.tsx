'use client'
import { FC, ReactElement, useState } from 'react'
import ProductButton from './ProductButton'
import EmailConfirmation from './EmailConfirmation'

type ProductLinksProps = { products: Product[] }

const ProductLinks: FC<ProductLinksProps> = ({ products }): ReactElement => {
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  return (
    <>
      <div className="flex-1 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, idx) => (
            <ProductButton
              key={idx}
              selected={selectedProduct?.id === product.id}
              product={product}
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>
      {selectedProduct && <EmailConfirmation product={selectedProduct} />}
    </>
  )
}

export default ProductLinks
