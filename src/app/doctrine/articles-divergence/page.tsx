// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { ArticlesOfDivergenceContent } from "devlink/ArticlesOfDivergenceContent";

export default async function HomePage() {
  return (
    <>
      <PageHeading title="Articles of Divergence" />
      <ArticlesOfDivergenceContent />
    </>
  );
}
