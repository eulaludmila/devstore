import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

// safeParse não dispara erro caso a validação não passe
const parsedEnv = envSchema.safeParse(process.env)

// flatten() -> transforma os erros em formato mais legível
if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error?.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
