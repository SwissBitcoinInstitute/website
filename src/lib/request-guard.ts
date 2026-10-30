// Guard for public POST endpoints (contact, inquiry, newsletter).
// Browsers always send an Origin or Referer header on POST requests and send
// JSON forms with the application/json content type. Direct API calls
// (scripts, bots) usually don't, so those are rejected here. This is a cheap
// first layer against trivial abuse, not a full defense - a determined client
// can still spoof headers.

export function assertSameOrigin(request: Request): string | null {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return 'Content-Type must be application/json';
  }

  // Compare against the host of the request itself, so localhost, Vercel
  // preview URLs and production all work without configuration.
  const host = request.headers.get('host');

  let source: URL | null = null;
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      source = new URL(origin);
    } catch {
      // fall through to referer
    }
  }
  if (!source) {
    const referer = request.headers.get('referer');
    if (referer) {
      try {
        source = new URL(referer);
      } catch {
        // unparseable referer -> treated as missing below
      }
    }
  }

  if (!source) return 'Missing Origin/Referer header';
  if (host && source.host !== host) return 'Cross-origin request blocked';
  return null;
}
