export { default } from 'next-auth/middleware'

export const config = { matcher: ['/admin', '/admin/:path*','/api/protected/:path*', ], debug: true,}
//'/api/protected/:path*'
