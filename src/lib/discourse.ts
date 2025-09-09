// lib/discourse.ts

// --- Types ---
export type DiscourseTopic = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
};

export type DiscoursePost = {
  id: number;
  cooked: string;
};

// --- Config / auth ---
const BASE = process.env.DISCOURSE_BASE_URL ?? "https://timetravelinstitute.com";
const API_KEY = process.env.DISCOURSE_API_KEY;
const API_USER = process.env.DISCOURSE_API_USERNAME;

function authHeaders(): HeadersInit {
  return API_KEY && API_USER ? { "Api-Key": API_KEY, "Api-Username": API_USER } : {};
}

function withTimeout(ms: number) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

// --- Core fetchers (unchanged behavior) ---
export async function fetchTopicsByTag(tag: string, opts?: { limit?: number }) {
  const { signal, done } = withTimeout(10_000);
  try {
    const res = await fetch(`${BASE}/tag/${encodeURIComponent(tag)}.json`, {
      headers: authHeaders(),
      next: { revalidate: 900 },
      signal,
    });
    if (!res.ok) throw new Error(`Failed tag fetch: ${res.status}`);
    const data = await res.json();
    return (data?.topic_list?.topics ?? []).slice(0, opts?.limit ?? 100) as DiscourseTopic[];
  } finally {
    done();
  }
}

export async function fetchTopicById(id: number) {
  const { signal, done } = withTimeout(10_000);
  try {
    const res = await fetch(`${BASE}/t/${id}.json`, {
      headers: authHeaders(),
      next: { revalidate: 15 },
      signal,
    });
    if (!res.ok) throw new Error(`Failed topic fetch: ${res.status}`);
    const data = await res.json();
    return {
      id: data?.id as number,
      title: data?.title as string,
      slug: data?.slug as string,
      posts: (data?.post_stream?.posts ?? []) as DiscoursePost[],
    };
  } finally {
    done();
  }
}

// --- Tiny helpers ---

/** Build a full avatar URL from Discourse's avatar_template. */
export function avatarUrl(template?: string, size = 60) {
  if (!template) return `${BASE}/images/avatar.png`;
  const filled = template.replace("{size}", String(size));
  return filled.startsWith("http") ? filled : `${BASE}${filled}`;
}

/** Human-readable date like "08 Sep 2025". */
export function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(d)
    .replace(",", "");
}

/** Unix timestamp (seconds) from an ISO string. */
export function unixDate(iso: string) {
  return Math.floor(new Date(iso).getTime() / 1000);
}

/**
 * Minimal author metadata for a topic:
 * username, avatar URL, profile URL.
 */
export async function fetchTopicAuthorMeta(id: number) {
  const { signal, done } = withTimeout(10_000);
  try {
    const res = await fetch(`${BASE}/t/${id}.json`, {
      headers: authHeaders(),
      next: { revalidate: 900 },
      signal,
    });
    if (!res.ok) throw new Error(`Failed topic meta fetch: ${res.status}`);
    const data = await res.json();

    const createdBy = data?.details?.created_by as
      | { username?: string; avatar_template?: string }
      | undefined;

    const username = createdBy?.username ?? "Unknown";
    const avatar = avatarUrl(createdBy?.avatar_template, 60);
    const userHref = `${BASE}/u/${username}`;

    return { username, avatar, userHref };
  } finally {
    done();
  }
}
