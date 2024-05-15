'use client'

import { useCart } from '@/context/cart-context'

interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  return (
    <button
      onClick={() => addToCart(productId)}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao Carrinho
    </button>
  )
}
