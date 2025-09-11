// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { ApologeticsContent as Content } from "devlink/ApologeticsContent";
export default async function HomePage() {
  return (
    <>
      <PageHeading title="Apologetics" />
      <Content />
    </>
  );
}
