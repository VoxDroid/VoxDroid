import type { Metadata } from "next";
import { editions } from "@/editions";
import { getCvData } from "@/lib/content/cv";
import { getEdition } from "@/lib/edition-server";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Mhar Andrei C. Macapallag (VoxDroid), full stack developer.",
};

export default async function CvPage() {
  const { Cv } = editions[await getEdition()];
  return <Cv data={getCvData()} />;
}
