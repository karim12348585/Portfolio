/** Build a mailto: URL with encoded subject and body. */
export function buildMailto(
  to: string,
  opts: { subject?: string; body?: string } = {},
): string {
  const params = new URLSearchParams();
  if (opts.subject) params.set("subject", opts.subject);
  if (opts.body) params.set("body", opts.body);
  const qs = params.toString();
  return `mailto:${to}${qs ? `?${qs}` : ""}`;
}
