const requests = new Map<string, { count: number; time: number }>();

export function rateLimit(ip: string, limit = 30) {
  const now = Date.now();
  const windowMs = 60_000;

  const entry = requests.get(ip) || { count: 0, time: now };

  if (now - entry.time > windowMs) {
    requests.set(ip, { count: 1, time: now });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  requests.set(ip, entry);
  return true;
}
