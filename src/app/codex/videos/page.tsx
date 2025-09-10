import { getVideos, extractYouTubeId } from "@/lib/videos";

export const revalidate = 300; // ISR: refresh every 5 minutes

export default async function CodexVideosPage() {
  let videos = [];
  try {
    videos = await getVideos(60);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-semibold">Videos</h1>
        <p>Error loading videos. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Videos</h1>
      {videos.length === 0 ? (
        <p>No videos yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => {
            const id = extractYouTubeId(v.videoId);
            if (!id) return null;
            return (
              <li key={v.id} className="rounded-2xl border p-3 shadow-sm">
                <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 9" }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={v.title ?? `Video ${id}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <h2 className="mt-3 text-base font-medium">{v.title ?? "Untitled"}</h2>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}