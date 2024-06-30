const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  customWorkerSrc: '/firebase-messaging-sw.js',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['rkdykaeilrlrtrowawoe.supabase.co', 'k.kakaocdn.net'],
  },
  experimental: {
    serverActions: true,
    scrollRestoration: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
      // {
      //   test: /\.wasm$/,
      //   type: 'webassembly/async',
      // },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withPWA(nextConfig);
