import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:locale(en|ar|fr)',
        destination: '/',
      },
      {
        source: '/:locale(en|ar|fr)/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);

