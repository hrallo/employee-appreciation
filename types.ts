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
    size_guide?: WP_Image
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
    attention: string
  }
}

interface Content extends Post {
  acf: {
    home: {
      home_image?: WP_Image
      home_heading?: string
      home_description?: string
      home_tagline?: string
    }
    global: {
      contact_phone?: string
      contact_email?: string
      verification_email_placeholder?: string
      logo?: WP_Image
    }
    order_details: {
      order_confirmation_heading?: string
      order_success_heading?: string
      order_success_description?: string
    }
  }
}

interface Order {
  _id: string
  createdAt: Date
  product: string
  productId: number
  receiverName: string
  receiverEmail: string
  size?: string
  color?: string
  isRemote: boolean
  shippingAddress: {
    attn: string
    addressName: string
    addressLine1: string
    addressLine2: string
    city: string
    stateOrProvince: string
    zipcode: string
  }
}
