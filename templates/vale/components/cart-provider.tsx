'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  addToCart,
  itemCount,
  lineId,
  removeLine,
  setQuantity,
  subtotal,
} from '@/lib/cart'
import { getProductById } from '@/lib/catalog'
import { products } from '@/lib/content'
import type { CartError, CartLine } from '@/lib/types'

const STORAGE_KEY = 'vale-cart'

type CartContextValue = {
  lines: CartLine[]
  count: number
  total: number
  add: (
    productId: string,
    input?: { quantity?: number; selections?: Record<string, string> },
  ) => CartError | null
  setQty: (lineId: string, quantity: number) => void
  remove: (lineId: string) => void
  quantityOf: (productId: string, selections?: Record<string, string>) => number
}

const CartContext = createContext<CartContextValue | null>(null)

function readStoredLines(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === 'string' &&
        typeof line.productId === 'string' &&
        typeof line.quantity === 'number' &&
        line.selections &&
        typeof line.selections === 'object',
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)
  const linesRef = useRef(lines)
  linesRef.current = lines

  useEffect(() => {
    setLines(readStoredLines())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, ready])

  const value: CartContextValue = {
    lines,
    count: itemCount(lines),
    total: subtotal(lines, products),
    add(productId, input) {
      const product = getProductById(productId)
      if (!product) return 'missing'
      const result = addToCart(linesRef.current, product, input)
      if (result.error) return result.error
      linesRef.current = result.lines
      setLines(result.lines)
      return null
    },
    setQty(lineId, quantity) {
      const line = linesRef.current.find((entry) => entry.id === lineId)
      const product = line ? getProductById(line.productId) : undefined
      if (!line || !product) return
      setLines(setQuantity(linesRef.current, product, lineId, quantity))
    },
    remove(lineId) {
      setLines(removeLine(linesRef.current, lineId))
    },
    quantityOf(productId, selections = {}) {
      const id = lineId(productId, selections)
      return lines.find((line) => line.id === id)?.quantity ?? 0
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}

export { cartErrorMessage } from '@/lib/cart'
