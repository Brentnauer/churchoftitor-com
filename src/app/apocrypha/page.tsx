// app/apocrypha/page.tsx
import { createReader } from "@keystatic/core/reader";
import Link from "next/link";
import keystaticConfig from "keystatic.config";
import { Header } from "../../../devlink/Header"

const reader = createReader(process.cwd(), keystaticConfig);

export default async function ApocryphaList() {
  const apocrypha = await reader.collections.apocrypha.all();
  return (
    <>
    <Header />

      <h1>Apocrypha</h1>
      <ul>
        {apocrypha.map((item) => (
          <li key={item.slug}>
            <Link href={`/apocrypha/${item.slug}`}>{item.entry.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}