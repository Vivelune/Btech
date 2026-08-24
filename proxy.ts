import { clerkMiddleware } from '@clerk/nextjs/server'

// createRouteMatcher-based route protection is deprecated by Clerk —
// see https://clerk.com/docs/upgrade-guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
// clerkMiddleware() itself is still required for Clerk to work, but it no
// longer does any path matching or redirect logic. Each protected
// page/layout now checks auth() directly and redirects itself:
// see app/account/page.tsx and app/admin/layout.tsx.
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}