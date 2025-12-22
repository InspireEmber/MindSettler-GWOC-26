/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    // Let `next lint` use the default project dir (no custom 'lint' folder)
    dirs: ["src"],
  },
};

export default nextConfig;
