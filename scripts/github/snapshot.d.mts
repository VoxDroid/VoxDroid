/** Types for the dependency-free snapshot script, so tests can import its pure helpers. */
export function contentRepos(dir?: string): string[];
export function streaks(days: { date: string; count: number }[]): {
  current: number;
  longest: number;
};
