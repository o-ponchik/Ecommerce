/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ["en", "uk"], defaultLocale: "uk", localeDetection: true },
};

module.exports = nextConfig;
