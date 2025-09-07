// app/apocrypha/[slug]/page.tsx
import { createReader } from "@keystatic/core/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { PageHeading } from "devlink/PageHeading";
import { BasicSection } from "devlink/BasicSection";
import { ScriptBody } from "devlink/ScriptBody";
import keystaticConfig from "keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateStaticParams() {
  const slugs = await reader.collections.apocrypha.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.apocrypha.read(params.slug);
  if (!post) {
    return <div>No Apocrypha Found</div>;
  }
  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);
  const content = Markdoc.renderers.react(renderable, React) as React.ReactNode;
  return (
    <>
      <PageHeading 
      title={post.title} 
      />
      <BasicSection slot={<ScriptBody content={content} />} />
      <hr />
      <a href={`/apocrypha`}>Back to Apocrypha</a>
    </>
  );
}