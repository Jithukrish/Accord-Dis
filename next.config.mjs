/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export → produces a self-contained `out/` folder
  // (index.html + assets) that can be uploaded to S3 / any static host.
  output: "export",
  // The Image Optimization API needs a server, which a static export has no
  // access to — serve the original images as-is instead.
  images: { unoptimized: true },
  // Emit `/path/index.html` style URLs so routes resolve cleanly on S3.
  trailingSlash: true,
};

export default nextConfig;
