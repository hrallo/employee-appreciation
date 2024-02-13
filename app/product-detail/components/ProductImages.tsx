'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { FC, ReactElement, useState } from 'react'

type ProductImagesProps = {
  featured?: Product['acf']['featured_image']
  supportingImage1?: Product['acf']['supporting_image_1']
  supportingImage2?: Product['acf']['supporting_image_2']
  supportingImage3?: Product['acf']['supporting_image_3']
}

type imageNum = 0 | 1 | 2 | 3

const ProductImages: FC<ProductImagesProps> = ({
  featured,
  supportingImage1,
  supportingImage2,
  supportingImage3,
}): ReactElement => {
  const router = useRouter()
  const defaultSelectedImage =
    featured || supportingImage1 || supportingImage2 || supportingImage3

  const isSelected = (id?: number) => selectedImage?.id === id

  const updatedImageMap = (
    selectedImage: WP_Image | undefined = defaultSelectedImage
  ) => {
    return {
      0: { image: featured, selected: selectedImage?.id === featured?.id },
      1: {
        image: supportingImage1,
        selected: isSelected(supportingImage1?.id),
      },
      2: {
        image: supportingImage2,
        selected: isSelected(supportingImage2?.id),
      },
      3: {
        image: supportingImage3,
        selected: isSelected(supportingImage3?.id),
      },
    }
  }

  const [selectedImage, setSelectedImage] = useState<WP_Image | undefined>(
    defaultSelectedImage
  )

  const [imageMap, setImageMap] = useState(updatedImageMap())

  const updateSelectedImage = (image: WP_Image) => {
    setSelectedImage(image)
    setImageMap(updatedImageMap(image))
  }

  const displayImage = (
    type: 'full' | 'thumbnail' = 'full',
    image?: WP_Image
  ) => {
    if (!image) return

    const display = (
      <img
        src={type === 'full' ? image.sizes.large : image.sizes.thumbnail}
        alt={image.alt}
        className={[type === 'full' ? 'mb-6' : ''].join(' ')}
      />
    )

    return type === 'thumbnail' ? (
      <button
        onClick={() => updateSelectedImage(image)}
        className={[
          'border hover:border-navy p-1',
          isSelected(image.id) ? 'border-navy-100' : '',
        ].join(' ')}
      >
        {display}
      </button>
    ) : (
      display
    )
  }

  const displayImageByNum = (
    imageNum: imageNum = 0,
    type: 'full' | 'thumbnail' = 'full'
  ) => displayImage(type, imageMap[imageNum].image)

  return (
    <>
      <div>
        <Button
          onClick={() => router.push('/')}
          icon="arrow_back"
          iconPosition="left"
        >
          Back
        </Button>
        <div className="py-12 px-6 md:px-12">
          {displayImage('full', selectedImage)}
          <div className="grid grid-cols-4 gap-4">
            {displayImageByNum(0, 'thumbnail')}
            {displayImageByNum(1, 'thumbnail')}
            {displayImageByNum(2, 'thumbnail')}
            {displayImageByNum(3, 'thumbnail')}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductImages
