import { z } from 'zod'
import data from '../data.json'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { searchParams } = request.nextUrl
  // parse valida se é string e retorna um erro
  const query = z.string().parse(searchParams.get('q'))
  const products = data.products.filter((product) => {
    return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  return Response.json(products)
}