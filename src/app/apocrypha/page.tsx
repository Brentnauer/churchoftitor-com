// app/apocrypha/page.tsx
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "keystatic.config";
import { Header } from "devlink/Header"
import { PageHeading } from "devlink/PageHeading"
import { ApocryphaCard } from "devlink/ApocryphaCard"
import { CardDisplay } from "devlink/CardDisplay"

const reader = createReader(process.cwd(), keystaticConfig);

export default async function ApocryphaList() {
  const apocrypha = await reader.collections.apocrypha.all();
  return (
    <>
    <Header />
    <PageHeading
    title = "Apocrypha"
    />
    <CardDisplay 
      slot={apocrypha.map((item) => (
        <ApocryphaCard
          key={item.slug}
          title={item.entry.title}
          link={{ href: `/apocrypha/${item.slug}` }}
        />
      ))}
    />
    </>
  );
}