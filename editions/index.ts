import type { ComponentType, ReactNode } from "react";
import type { HomeData, Project } from "@/lib/content";
import type { Edition } from "@/lib/editions";
import * as photocopyHome from "./photocopy/Home";
import * as photocopyProjects from "./photocopy/Projects";
import * as photocopyShell from "./photocopy/Shell";
import * as sunPrintHome from "./sun-print/Home";
import * as sunPrintProjects from "./sun-print/Projects";
import * as sunPrintShell from "./sun-print/Shell";
import * as twoInksHome from "./two-inks/Home";
import * as twoInksProjects from "./two-inks/Projects";
import * as twoInksShell from "./two-inks/Shell";

export type EditionModule = {
  Shell: ComponentType<{ children: ReactNode }>;
  Home: ComponentType<{ data: HomeData }>;
  ProjectsIndex: ComponentType<{ projects: Project[]; categories: string[] }>;
  Detail: ComponentType<{ project: Project; readme: string | null }>;
  NotFound: ComponentType;
};

export const editions: Record<Edition, EditionModule> = {
  "two-inks": { ...twoInksShell, ...twoInksHome, ...twoInksProjects },
  photocopy: { ...photocopyShell, ...photocopyHome, ...photocopyProjects },
  "sun-print": { ...sunPrintShell, ...sunPrintHome, ...sunPrintProjects },
};
