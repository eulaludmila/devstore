/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['github.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'github.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
}

export default nextConfig
