// app/scripts/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { PageHeading } from "devlink/PageHeading";
import { BasicSection } from "devlink/BasicSection";
import { ScriptBody } from "devlink/ScriptBody";
import { fetchTopicById, fetchTopicsByTag } from "@/lib/discourse";

export async function generateStaticParams() {
  const topics = await fetchTopicsByTag("titorian-scripts");
  return topics.map((t) => ({ id: String(t.id) }));
}

export const dynamicParams = true;
export const revalidate = 900; // 15 minutes

export default async function ScriptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) return notFound();

  const topic = await fetchTopicById(num).catch(() => null);
  if (!topic) return notFound();

  const firstPost = topic.posts[0];
  const html = firstPost?.cooked ?? "<p>No content</p>";

  const Content = () => (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  return (
    <>
      <PageHeading title={topic.title} />
      <BasicSection slot={<ScriptBody content={<Content />} />} />
    </>
  );
}
