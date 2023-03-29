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

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    require('./preScripts/getCategories');

    return config
  },

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
