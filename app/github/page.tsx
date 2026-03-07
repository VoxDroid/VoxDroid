import { getGitHubUserStats } from "@/lib/github";
import GithubClient from "@/components/github-client";

// Revalidate every hour
export const revalidate = 3600;

export const metadata = {
  title: "GitHub Metrics | VoxDroid",
  description: "Comprehensive GitHub metrics, statistics, and coding activity.",
};

export default async function GithubPage() {
  const stats = await getGitHubUserStats("VoxDroid");

  if (!stats) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center font-mono bg-gradient-to-b from-background via-background to-background/95">
        <div className="text-center p-8 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg max-w-md mx-auto">
          <p className="text-red-600 dark:text-red-400 font-bold mb-4 flex items-center justify-center gap-2">
            <span>✗</span> Error: 500
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load GitHub stats from API.
          </p>
          <p className="text-sm text-gray-500 mt-4 opacity-80">
            This could be due to GitHub API rate limits.
          </p>
        </div>
      </div>
    );
  }

  return <GithubClient stats={stats} />;
}
