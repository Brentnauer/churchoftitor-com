// app/page.tsx
import { Header } from "../../devlink/Header";
import keystaticConfig from "keystatic.config"; 
import { createReader } from "@keystatic/core/reader";

export default async function HomePage() {
  // create a reader instance
  const reader = createReader(process.cwd(), keystaticConfig);

  // load your singleton
  const homepage = await reader.singletons.homepage.read();

  // pull the title (with a fallback)
  const siteTitle = homepage?.title ?? "Site";

  return (
    <>
      <Header text={siteTitle} />
    </>
  );
}
