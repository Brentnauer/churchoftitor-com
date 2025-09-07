// app/apocrypha/page.tsx
import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "keystatic.config";
import { PageHeading } from "devlink/PageHeading";
import { ApocryphaCard } from "devlink/ApocryphaCard";
import { CardDisplay } from "devlink/CardDisplay";

export const metadata: Metadata = {
  title: "Apocrypha · Church of Titor",
  description:
    "Collected apocrypha: drafts, fragments, and recovered texts from the Church of Titor.",
  openGraph: {
    title: "Apocrypha · Church of Titor",
    description:
      "Collected apocrypha: drafts, fragments, and recovered texts from the Church of Titor.",
    url: "/apocrypha",
    siteName: "Church of Titor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apocrypha · Church of Titor",
    description:
      "Collected apocrypha: drafts, fragments, and recovered texts from the Church of Titor.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function ApocryphaList() {
  const apocrypha = await reader.collections.apocrypha.all();

  return (
    <>
      <PageHeading title="Apocrypha" />
      {apocrypha.length === 0 ? (
        <p style={{ padding: "1rem" }}>Nothing here yet.</p>
      ) : (
        <CardDisplay
          slot={apocrypha.map((item) => (
            <ApocryphaCard
              key={item.slug}
              title={item.entry.title}
              link={{ href: `/apocrypha/${item.slug}` }}
            />
          ))}
        />
      )}
    </>
  );
}
