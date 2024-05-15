'use client'

import { useSearchParams } from 'next/navigation'

export function TextResultSearch() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <p className="text-small">
      Resultados para: <span className="font-semibold">{query}</span>
    </p>
  )
}
