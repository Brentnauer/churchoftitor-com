// lib/discourse.ts
export type DiscourseTopic = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
};

export type DiscourseTopicList = { topics: DiscourseTopic[] };

const BASE = process.env.DISCOURSE_BASE_URL ?? "https://timetravelinstitute.com";
const API_KEY = process.env.DISCOURSE_API_KEY;
const API_USER = process.env.DISCOURSE_API_USERNAME;

function authHeaders(): HeadersInit {
  return API_KEY && API_USER
    ? { "Api-Key": API_KEY, "Api-Username": API_USER }
    : {}; // <- never undefined
}

function withTimeout(ms: number) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

export async function fetchTopicsByTag(tag: string, opts?: { limit?: number }) {
  const { signal, done } = withTimeout(10_000); // 10s
  try {
    const res = await fetch(`${BASE}/tag/${encodeURIComponent(tag)}.json`, {
      headers: authHeaders(),            // <- no spread
      next: { revalidate: 900 },          // match your page revalidate
      signal,
    });
    if (!res.ok) throw new Error(`Failed tag fetch: ${res.status}`);
    const data = await res.json();
    const topics: DiscourseTopic[] = (data?.topic_list?.topics ?? []).slice(
      0,
      opts?.limit ?? 100
    );
    return topics;
  } finally {
    done();
  }
}

export type DiscoursePost = {
  id: number;
  cooked: string;
};

export async function fetchTopicById(id: number) {
  const { signal, done } = withTimeout(10_000); // 10s
  try {
    const res = await fetch(`${BASE}/t/${id}.json`, {
      headers: authHeaders(),
      next: { revalidate: 15 }, // keep the detail page fresh too
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
