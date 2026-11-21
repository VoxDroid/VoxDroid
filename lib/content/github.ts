import fs from "node:fs";
import path from "node:path";
import { snapshotSchema, type Snapshot } from "./schema";

let cached: Snapshot | null = null;

/** The committed GitHub snapshot (data/github.json), validated. */
export function getSnapshot(): Snapshot {
  if (cached && process.env.NODE_ENV === "production") return cached;
  const raw: unknown = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/github.json"), "utf8"),
  );
  const parsed = snapshotSchema.safeParse(raw);
  if (!parsed.success)
    throw new Error(
      "data/github.json is invalid: " + parsed.error.issues[0]?.message,
    );
  cached = parsed.data;
  return cached;
}
