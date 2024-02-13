'use client'
import { getProductTitle } from '@/utils'
import { FC, ReactElement } from 'react'

type ProductButtonProps = {
  product: Product
  onSelectProduct: (product?: Product) => void
  selected: boolean
}

const ProductButton: FC<ProductButtonProps> = ({
  product,
  onSelectProduct,
  selected,
}): ReactElement => {
  const getImageUrl = () => {
    if (!product.acf.featured_image) return
    return product.acf.featured_image.sizes.medium
  }

  const toggle = () =>
    selected ? onSelectProduct(undefined) : onSelectProduct(product)

  return (
    <div className="relative flex">
      <button
        className={[
          'flex-1 bg-white border-2 rounded flex flex-col justify-between p-4 transition duration-300',
          selected
            ? 'border-2 border-navy'
            : 'border-transparent hover:border-navy/30',
        ].join(' ')}
        onClick={toggle}
      >
        <div className="flex-2">
          {getImageUrl() && (
            <img
              src={getImageUrl()}
              alt="Hussman Logo"
              className="object-contain"
            />
          )}
        </div>

        <h2 className="flex-1 w-full text-navy text-center text-md font-semibold pt-3">
          {getProductTitle(product)}
        </h2>
      </button>
      {selected && (
        <button onClick={toggle} className="absolute right-2 top-2 text-navy">
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  )
}

export default ProductButton
