import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    /* 
      cache: force-cache(default) => usar o cache para cachear por tempo indeterminado
      cache: no-store => sempre será atualizada
    */
    next: {
      /* revalidate => o primeiro usuário vai buscar os dados atualizados e 
      salvar em cache, e nos próximos n segundos os usuários visualizarão os dados em cache
      e depois de n segundos o próximo usuário vai fazer uma requisição nova */
      revalidate: 60 * 60, // segundos (60 * 60 = 1 hora)
    },
  })

  const products = await response.json()

  return products
}

// em página dinâmicas usamos essa funcionalidade para pegar certo tipo de informação da página
export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  // Mesmo eu chamando a função duas vezes na mesma página, o conceito de Memoization é aplicado e não será requisitado duas vezes
  const product = await getProduct(params.slug)
  return {
    title: product.title,
  }
}

// Geração estática da página - o usuário irá acessar de forma instantanea
export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()
  // return [
  //   {
  //     slug: 'moletom-never-stop-learning',
  //   },
  // ]

  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          className="relative"
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="nt-2 leading-relaxed text-size-400">
          {product.description}
        </p>

        <div className="nt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {product.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            {`Em 12x s/ juros de  ${(product.price / 12).toLocaleString(
              'pt-br',
              {
                style: 'currency',
                currency: 'BRL',
              },
            )}`}
          </span>
        </div>

        <div className="nt-8 space-y-4">
          <span className="block font-semibold"> Tamanhos </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex uppercase h-9 w-14 items-center justify-center rounded-full border border-zinc-400 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex uppercase h-9 w-14 items-center justify-center rounded-full border border-zinc-400 bg-zinc-800 text-sm font-semibold"
            >
              m
            </button>
            <button
              type="button"
              className="flex uppercase h-9 w-14 items-center justify-center rounded-full border border-zinc-400 bg-zinc-800 text-sm font-semibold"
            >
              g
            </button>
            <button
              type="button"
              className="flex uppercase h-9 w-14 items-center justify-center rounded-full border border-zinc-400 bg-zinc-800 text-sm font-semibold"
            >
              gg
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
