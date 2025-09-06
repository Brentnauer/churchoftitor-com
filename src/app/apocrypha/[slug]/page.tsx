// app/apocrypha/[slug]/page.tsx (or wherever your dynamic route is)
import { createReader } from "@keystatic/core/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Header } from "../../../../devlink/Header"
import { PageHeading } from "../../../../devlink/PageHeading"
import { BasicSection } from "../../../../devlink/BasicSection"

import keystaticConfig from "keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.apocrypha.read(params.slug); // Changed from posts to apocrypha
  if (!post) {
    return <div>No Apocrypha Found</div>; // Updated error message for clarity
  }
  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);
  return (
    <>
    <Header />
    <PageHeading
    title = {post.title}
    />
    <BasicSection
    slot = {Markdoc.renderers.react(renderable, React)}
    />

    </>
  );
}