// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { TravelersTestamentContent } from "devlink/TravelersTestamentContent";

export default async function HomePage() {
  return (
    <>
      <PageHeading title="Travelers' Testament" />
      <TravelersTestamentContent />
    </>
  );
}
