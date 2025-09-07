// app/page.tsx
import { BasicSection } from "devlink/BasicSection";
import { CreedTabs } from "devlink/CreedTabs";
import hljs from 'highlight.js/lib/core';
import basic from 'highlight.js/lib/languages/basic';

hljs.registerLanguage('basic', basic);

export default async function HomePage() {
  return (
    <>
    <BasicSection slot={<h2 style={{ textAlign: "center" }}>Welcome to the Church of Titor.<br />This is a placeholder homepage.</h2>} />
    </>
  );
}
