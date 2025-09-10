// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { WebringContent } from "devlink/WebringContent";


export default async function HomePage() {
  return (
    <>
    <PageHeading title="John Titor Webring" />
    <WebringContent />
    </>
  );
}
