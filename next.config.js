/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/departemen',
        destination: '/struktur',
        permanent: true,
      },
      {
        source: '/departemen/:slug',
        destination: '/struktur/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Only meaningful once the app is actually served over HTTPS on the
          // campus server (see migration plan §0/§3) — harmless to send over
          // plain HTTP in the meantime since browsers ignore it there.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;
