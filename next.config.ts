import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
