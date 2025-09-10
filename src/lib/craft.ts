type GqlResp<T> = { data?: T; errors?: Array<{ message: string; extensions?: Record<string, unknown> }> };

const ENDPOINT = process.env.CRAFT_GRAPHQL_ENDPOINT;
const TOKEN = process.env.CRAFT_GRAPHQL_TOKEN;

export async function craftQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!ENDPOINT || !TOKEN) {
    throw new Error("Missing CRAFT_GRAPHQL_ENDPOINT or CRAFT_GRAPHQL_TOKEN environment variables");
  }

  console.log("Fetching from:", ENDPOINT);
  console.log("Query:", query);
  console.log("Variables:", variables);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
    redirect: "follow",
  });

  console.log("Response URL:", res.url);
  console.log("Response Status:", res.status);

  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!ct.includes("application/json")) {
    const snippet = text.slice(0, 280).replace(/\s+/g, " ");
    throw new Error(
      `Craft GraphQL expected JSON but got "${ct || "unknown"}" (status ${res.status}) from ${res.url}. Body starts: ${snippet}`
    );
  }

  let json: GqlResp<T>;
  try {
    json = JSON.parse(text);
  } catch {
    const snippet = text.slice(0, 200).replace(/\s+/g, " ");
    throw new Error(`Craft GraphQL invalid JSON (status ${res.status}) from ${res.url}. Body: ${snippet}`);
  }

  console.log("GraphQL Response:", JSON.stringify(json, null, 2));

  if (!res.ok || json.errors) {
    throw new Error(
      json.errors?.map(e => `${e.message} ${JSON.stringify(e.extensions || {})}`).join("\n") ||
      `Craft GraphQL error (${res.status}) from ${res.url}`
    );
  }

  if (!json.data) {
    throw new Error("Craft GraphQL response contains no data");
  }

  return json.data;
}