// app/page.tsx
import keystaticConfig from "keystatic.config"; 
import { createReader } from "@keystatic/core/reader";
import { BasicSection } from "devlink/BasicSection";

export default async function HomePage() {
  // create reader instance
  const reader = createReader(process.cwd(), keystaticConfig);

  // load singleton
  const homepage = await reader.singletons.homepage.read();

  // pull the title (with a fallback)
  const siteTitle = homepage?.title ?? "Church of Titor";

  return (
    <>
    <BasicSection slot={<h2 style={{ textAlign: "center" }}>Welcome to the Church of Titor.<br />This is a placeholder homepage.</h2>} />
    </>
  );
}
