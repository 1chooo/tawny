export type CategoryId = 'ceramics' | 'paintings' | 'others'

export type Availability = 'available' | 'sold-out' | 'paused' | 'options'

export type VariantOption = {
  id: string
  label: string
  /** Added to the product base price when this option is selected. */
  priceDelta?: number
  /** Caps this option. Falls back to the product inventory when omitted. */
  inventory?: number
}

export type VariantGroup = {
  id: string
  label: string
  options: VariantOption[]
}

export type ProductImage = {
  src: string
  alt: string
}

export type Product = {
  id: string
  slug: string
  title: string
  category: CategoryId
  medium: string
  price: number
  currency: 'USD'
  description: string
  materials: string
  dimensions: string
  images: ProductImage[]
  availability: Availability
  inventory: number
  variants?: VariantGroup[]
  featured?: boolean
}

export type Category = {
  id: CategoryId
  label: string
  description: string
  shopLabel: string
}

export type CartLine = {
  id: string
  productId: string
  quantity: number
  selections: Record<string, string>
}

export type CartError = 'sold-out' | 'paused' | 'options' | 'limit' | 'missing'
