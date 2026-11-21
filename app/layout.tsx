import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { EditionSwitcher } from "@/components/EditionSwitcher";
import { site } from "@/content/site";
import { editions } from "@/editions";
import { getEdition } from "@/lib/edition-server";
import { allFontVariables } from "@/lib/fonts";
import "./globals.css";

const SITE_URL = process.env.SITE_URL ?? "https://voxdroid.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.handle}: ${site.tagline}`,
    template: `%s · ${site.handle}`,
  },
  description: site.intro,
  applicationName: site.handle,
  authors: [{ name: site.handle, url: site.links[0].href }],
  icons: { icon: "/ico/vox.ico" },
  openGraph: {
    type: "website",
    siteName: site.handle,
    title: `${site.handle}: ${site.tagline}`,
    description: site.intro,
    images: [
      {
        url: "/profile/VoxDroid.jpg",
        width: 924,
        height: 924,
        alt: site.handle,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: site.handle,
    description: site.intro,
    images: ["/profile/VoxDroid.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ede8dd",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const edition = await getEdition();
  const { Shell } = editions[edition];
  return (
    <html lang="en" data-edition={edition} className={allFontVariables}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Shell>{children}</Shell>
        <EditionSwitcher current={edition} />
      </body>
    </html>
  );
}
