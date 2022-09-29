/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'help.twitter.com',
      'images.unsplash.com',
      'randomuser.me',
      'cdn.cms-twdigitalassets.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
