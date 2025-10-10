/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POST_CODE_ApiKey: process.env.POST_CODE_ApiKey,
    // NEXT_PUBLIC_API_URL: "https://api.limitlesscover.co.uk",
    NEXT_PUBLIC_API_URL: "http://localhost:8000",
  },
};

export default nextConfig;
