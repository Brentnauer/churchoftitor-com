// components/YouTubeEmbed.tsx
export default function YouTubeEmbed({
  videoId,
  start = 0,
  title = "YouTube video",
}: {
  videoId: string;
  start?: number;
  title?: string;
}) {
  const params = new URLSearchParams({
    start: String(start),          // start at 13s
    modestbranding: "1",           // minimal YouTube logo
    rel: "0",                      // related videos from same channel
    playsinline: "1",              // avoid full-screen on iOS
    controls: "1",                 // show controls (clean but usable)
    cc_load_policy: "0",           // captions off by default (set "1" to force)
    iv_load_policy: "3",           // hide video annotations
    color: "white",                // white progress bar (clean look)
  }).toString();

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
        }}
      />
    </div>
  );
}
