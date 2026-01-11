import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis and Ratelimit
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter that allows 5 requests per 10 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});

export async function middleware(req: NextRequest) {
  // Only rate limit the generation endpoint
  if (req.nextUrl.pathname.startsWith("/api/generate")) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // Check limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // If rate limit exceeded
    if (!success) {
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
    
    // If successful, add headers for client visibility
    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/generate/:path*",
};