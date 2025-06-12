import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     include: /node_modules/,
  //     use: ['style-loader', 'css-loader'],
  //   });
  //   return config;
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(config);