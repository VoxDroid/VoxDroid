import { editions } from "@/editions";
import { getHomeData } from "@/lib/content";
import { getEdition } from "@/lib/edition-server";

export default async function HomePage() {
  const { Home } = editions[await getEdition()];
  return <Home data={getHomeData()} />;
}
