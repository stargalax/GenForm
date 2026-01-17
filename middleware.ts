import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Initialize Rate Limiter
// FIXED: Set to 10 requests per 10 minutes to match PR description
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"), 
  analytics: true,
});

export default clerkMiddleware(async (auth, req) => {
  // 1. Rate Limiting Logic (Only runs for /api/generate)
  if (req.nextUrl.pathname.startsWith("/api/generate")) {
    // Extract real IP (handles Vercel/Cloudflare proxies)
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // If limit exceeded, return 429 immediately
    if (!success) {
      console.warn(`[Security] Rate limit exceeded for IP: ${ip}`);
      return new NextResponse(
        JSON.stringify({ error: "Too Many Requests", retryAfter: reset }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  }

  // 2. Clerk Authentication
  // If rate limit passes (or it's not the generate route), we do nothing.
  // Clerk's middleware automatically handles the rest.
});

// Standard Next.js + Clerk Matcher Config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};