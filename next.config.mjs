/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "vdzaxqmdyobnbinsjyov.supabase.co" },
      { hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
