// app/scripts/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { ApocryphaCard as ScriptCard } from "devlink/ApocryphaCard";
import { CardDisplay } from "devlink/CardDisplay";
import { fetchTopicsByTag } from "@/lib/discourse";

export default async function ScriptsIndex() {
  const topics = await fetchTopicsByTag("titorian-scripts");

  return (
    <>
      <PageHeading title="Scripts" />
      {topics.length === 0 ? (
        <p style={{ padding: "1rem" }}>Nothing here yet.</p>
      ) : (
        <CardDisplay
          slot={topics.map((t) => (
            <ScriptCard
              key={t.id}
              title={t.title}
              link={{ href: `/scripts/${t.id}` }} // ID-only URLs
            />
          ))}
        />
      )}
    </>
  );
}
