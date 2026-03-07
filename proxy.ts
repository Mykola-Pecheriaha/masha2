import { type NextRequest } from 'next/server'

import { updateSession } from '@/lib/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    // exclude API routes so our API endpoints are reachable without auth redirect
    '/((?!_next/static|_next/image|favicon.ico|api(?:/.*)?|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
