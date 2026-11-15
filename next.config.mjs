/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: every route is pre-rendered to real HTML at build
  // time, which is what search engines (and slow connections) see first.
  output: "export",
  trailingSlash: true,
  // Set PAGES_BASE_PATH=/zuhayn only for the GitHub Pages preview build,
  // which is served from a subpath. Normal builds stay at the domain root.
  basePath: process.env.PAGES_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
