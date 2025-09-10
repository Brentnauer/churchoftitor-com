// app/page.tsx
import { PageHeading } from "devlink/PageHeading";
import { CodexContent } from "devlink/CodexContent";
import hljs from 'highlight.js/lib/core';
import basic from 'highlight.js/lib/languages/basic';

hljs.registerLanguage('basic', basic);

export default async function HomePage() {
  return (
    <>
    <PageHeading title="Codex" />
    <CodexContent />
    </>
  );
}
