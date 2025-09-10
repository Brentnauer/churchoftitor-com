import { craftQuery } from "./craft";

interface Video {
  id: string;
  title: string | null;
  videoId: string;
}

export async function getVideos(limit: number): Promise<Video[]> {
  const query = `
    query GetVideos($limit: Int, $site: String) {
      entries(section: "videos", limit: $limit, site: $site) {
        id
        title
        ... on videos_videos_Entry {
          videoId
        }
      }
    }
  `;
  const variables = {
    limit,
    site: process.env.CRAFT_SITE_HANDLE || "churchOfTitor",
  };

  const data = await craftQuery<{ entries: Video[] }>(query, variables);
  return data.entries;
}

export function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}