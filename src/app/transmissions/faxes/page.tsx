// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { FaxContent } from "devlink/FaxContent";

export default async function FaxPage() {
  return (
    <>
    <PageHeading title="John Titor's Faxes" />
    <FaxContent />
    </>
  );
}