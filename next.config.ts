/** @type {import('next').NextConfig} */
const nextConfig = {
  // No special configuration is needed for Vercel.
  // We can leave this empty.
};

export default nextConfig;



// /** @type {import('next').NextConfig} */

// // This checks if we are building for production
// const isProd = process.env.NODE_ENV === 'production';

// const nextConfig = {
//   output: 'export',
//   // Use the basePath for production builds, but not for local development
//   basePath: isProd ? '/lock-box-web' : '',
// };

// export default nextConfig;