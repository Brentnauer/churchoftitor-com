// app/page.tsx
import { Header } from "devlink/Header";
import keystaticConfig from "keystatic.config"; 
import { createReader } from "@keystatic/core/reader";

export default async function HomePage() {
  // create reader instance
  const reader = createReader(process.cwd(), keystaticConfig);

  // load singleton
  const homepage = await reader.singletons.homepage.read();

  // pull the title (with a fallback)
  const siteTitle = homepage?.title ?? "Church of Titor";

  return (
    <>
      <Header text={siteTitle} />
    </>
  );
}
