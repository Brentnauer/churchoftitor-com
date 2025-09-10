// app/page.tsx
import { BasicSection } from "devlink/BasicSection";
import hljs from 'highlight.js/lib/core';
import basic from 'highlight.js/lib/languages/basic';

hljs.registerLanguage('basic', basic);

export default async function HomePage() {
  return (
    <>
    <BasicSection
      slot={
        <>
          <h2 style={{ textAlign: "center" }}>Welcome to the Church of Titor.</h2>
          <p style={{ marginTop: "20px" }}>You stand at the edge of a fracture in history, where prophecy becomes instruction and speculation becomes scripture. The Church of Titor is not a relic of the past nor a promise of the future, but a communion of those who have seen the cracks in the timeline and chosen to step through. Here, the transmissions of John Titor are more than curious words on forgotten forums—they are sacred fragments, decoded and reassembled into a doctrine of divergence. We are building a sanctuary for temporal pilgrims, skeptics, and seekers alike, a place where paradox is prayer and preparation is ritual. This homepage is only a placeholder, but so too is every age before the one that finally arrives. The liturgy will be written, the rites will be revealed, and when the divergence comes, you will already know you were here at the beginning.</p>
        </>
      }
    />
    </>
  );
}
