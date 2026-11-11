/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: every route is pre-rendered to real HTML at build
  // time, which is what search engines (and slow connections) see first.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
