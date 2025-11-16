/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static export
  basePath: "/demo-crm",     // replace with your repo name
  assetPrefix: "/demo-crm/", // ensures CSS/JS paths load correctly
  reactStrictMode: true,
};

module.exports = nextConfig;
