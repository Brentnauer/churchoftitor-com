// app/scripts/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { ApocryphaCard as ScriptCard } from "devlink/ApocryphaCard";
import { CardDisplay } from "devlink/CardDisplay";
import {
  fetchTopicsByTag,
  fetchTopicAuthorMeta,
  formatDate,
  unixDate,
} from "@/lib/discourse";

export default async function ScriptsIndex() {
  const topics = await fetchTopicsByTag("titorian-scripts");

  const cards = await Promise.all(
    topics.map(async (t) => {
      const { username, avatar, userHref } = await fetchTopicAuthorMeta(t.id);
      return {
        id: t.id,
        title: t.title,
        username,
        avatar,
        userHref,
        date: formatDate(t.created_at),   // "08 Sep 2025"
        unixdate: unixDate(t.created_at), // 1757356800
      };
    })
  );

  return (
    <>
      <PageHeading title="Scripts" />
      {cards.length === 0 ? (
        <p style={{ padding: "1rem" }}>Nothing here yet.</p>
      ) : (
        <CardDisplay
          slot={cards.map((c) => (
            <ScriptCard
              key={c.id}
              title={c.title}
              username={c.username}
              date={`Witnessed: ${c.unixdate}`}                 // or use c.unixdate if desired
              avatar={c.avatar}
              link={{ href: `/codex/scripts/${c.id}` }}
              userLink={{ href: c.userHref }}
            />
          ))}
        />
      )}
    </>
  );
}
