// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { TransmissionsContent } from "devlink/TransmissionsContent";
import hljs from 'highlight.js/lib/core';
import basic from 'highlight.js/lib/languages/basic';

hljs.registerLanguage('basic', basic);

export default async function HomePage() {
  return (
    <>
    <PageHeading title="John Titor's Posts" />
    <TransmissionsContent />
    </>
  );
}
