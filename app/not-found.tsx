import { editions } from "@/editions";
import { getEdition } from "@/lib/edition-server";

export default async function NotFoundPage() {
  const { NotFound } = editions[await getEdition()];
  return <NotFound />;
}
