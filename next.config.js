/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://localhost:8000/:path*',
  //     },
  //   ]
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.kingpork.com.tw',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
