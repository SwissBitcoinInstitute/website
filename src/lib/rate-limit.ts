// Simple fixed-window, in-memory rate limiter keyed by client IP.
//
// Note: on serverless hosting (Vercel) each instance keeps its own counters,
// so the limits are approximate. This is a deterrent that stops realistic
// abuse volumes, not a hard guarantee. If exact global limits are ever
// needed, swap this for a shared store (e.g. Upstash Redis).

const MAX_TRACKED_KEYS = 10_000;

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets, for the Retry-After header. */
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Keep memory bounded: when the map grows too large, drop expired windows.
  if (windows.size >= MAX_TRACKED_KEYS) {
    windows.forEach((w, k) => {
      if (w.resetAt <= now) windows.delete(k);
    });
  }

  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  current.count += 1;
  if (current.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

// Vercel sets x-forwarded-for on incoming requests. Local dev may have
// neither header; those requests share one "unknown" bucket.
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') || 'unknown';
}
