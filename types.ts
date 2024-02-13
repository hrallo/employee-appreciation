interface WP_Image {
  id: number
  title: string
  url: string
  alt?: string
  sizes: {
    thumbnail: string
    medium: string
    medium_large: string
    large: string
  }
}

interface Post {
  [key: string]: any
  id: number
  date: Date
  title: { rendered: string }
}

interface Product extends Post {
  acf: {
    description?: string
    sizes?: string
    colors?: string
    featured_image?: WP_Image
    supporting_image_1?: WP_Image
    supporting_image_2?: WP_Image
    supporting_image_3?: WP_Image
  }
}

interface Address extends Post {
  acf: {
    address_name: string
    address_line_1: string
    address_line_2?: string
    city: string
    state: string
    zipcode: string
  }
}
