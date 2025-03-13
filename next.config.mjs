// const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Extract the hostname from the backend URL
// const hostname = new URL(backendUrl).hostname;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "crm-backend.yorkhospitality.ca"],
    },
};

export default nextConfig;
