/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ["en", "uk"], defaultLocale: "uk", localeDetection: false },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
