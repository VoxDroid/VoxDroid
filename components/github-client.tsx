"use client";

import { motion } from "framer-motion";
import { GitHubUserStats } from "@/lib/github";
import {
  Code,
  GitCommit,
  Star,
  GitFork,
  Activity,
  Calendar,
  Clock,
  Github,
  Award,
  BookOpen,
  Users,
  Box,
  Terminal,
  BarChart,
  Flame,
  GitBranch,
  GitPullRequest,
  FolderGit2,
  CheckCircle2,
  Trophy,
  HardDrive,
  AlertCircle,
  Code2,
  Medal,
} from "lucide-react";

interface GithubClientProps {
  stats: GitHubUserStats;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const formatBytes = (kb: number) => {
  if (kb === 0) return "0 KB";
  const k = 1024;
  const sizes = ["KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(kb) / Math.log(k));
  return parseFloat((kb / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function GithubClient({ stats }: GithubClientProps) {
  // Normalize contribution graph
  const maxContribution = Math.max(
    ...(stats.contributionGraph?.length ? stats.contributionGraph : [1]),
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background via-background to-background/95">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-green-600 dark:text-green-400">$</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">gh api</span>{" "}
            <span className="text-cyan-600 dark:text-cyan-400">user/stats</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm max-w-2xl mx-auto">
            // Full GitHub activity overview, coding metrics, top languages, and
            contribution history. Data is cached and revalidated consistently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main User Info - Fastfetch Style */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-4">
                  overview.json
                </span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-sm">
                  {/* Basic Stats Grid */}
                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      Followers / Following
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.followers}{" "}
                      <span className="text-base font-normal text-gray-500">
                        / {stats.following}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      Repos / Gists
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.publicRepos}{" "}
                      <span className="text-base font-normal text-gray-500">
                        / {stats.publicGists}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Total Stars
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalStars}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <GitFork className="h-4 w-4 text-blue-500" />
                      Total Forks
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalForks}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Open Issues
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalOpenIssues}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <HardDrive className="h-4 w-4 text-gray-500" />
                      Disk Usage
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {formatBytes(stats.totalDiskUsage)}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Issues Opened
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalIssues}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <GitPullRequest className="h-4 w-4 text-cyan-500" />
                      Pull Requests
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalPRs}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      Lines Written
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      ~{formatNumber(stats.linesOfCode)}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <GitCommit className="h-4 w-4 text-purple-500" />
                      Total Commits
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {formatNumber(stats.totalCommits || 0)}
                    </div>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22]/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-green-500/30">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Account Age
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.accountAge}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        years
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Since {stats.accountCreated}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Languages Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Code className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  all_languages
                </span>
              </div>

              <div className="p-6">
                {/* Language Bar */}
                <div className="h-3 rounded-full overflow-hidden flex mb-6 shadow-inner bg-gray-200 dark:bg-gray-800">
                  {stats.topLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      title={`${lang.name}: ${lang.percentage}%`}
                      className="h-full transition-all duration-500"
                    />
                  ))}
                </div>

                <div className="space-y-3 font-mono text-sm max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {stats.allLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#161b22]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3.5 h-3.5 rounded-full shadow-sm"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {lang.percentage}%
                      </span>
                    </div>
                  ))}
                  {stats.allLanguages.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No language data available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Streaks & Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Streaks Widget */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Flame className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  ./streaks.sh
                </span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Current Streak */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-transparent dark:from-orange-900/10 dark:to-transparent rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <p className="text-orange-600 dark:text-orange-400 font-mono text-sm mb-2 font-semibold">
                      Current Streak
                    </p>
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {stats.currentStreak}
                    </div>
                    <p className="text-gray-500 text-xs font-mono">Days</p>
                    {stats.currentStreak > 0 && (
                      <div className="mt-3 text-xs text-gray-400 font-mono text-center">
                        {stats.currentStreakStart} - {stats.currentStreakEnd}
                      </div>
                    )}
                  </div>

                  {/* Longest Streak */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <p className="text-blue-600 dark:text-blue-400 font-mono text-sm mb-2 font-semibold">
                      Longest Streak
                    </p>
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {stats.longestStreak}
                    </div>
                    <p className="text-gray-500 text-xs font-mono">Days</p>
                    {stats.longestStreak > 0 && (
                      <div className="mt-3 text-xs text-gray-400 font-mono text-center">
                        {stats.longestStreakStart} - {stats.longestStreakEnd}
                      </div>
                    )}
                  </div>

                  {/* Yearly */}
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#161b22]/50 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-cyan-600 dark:text-cyan-400 font-mono text-xs mb-1">
                      Contributions This Year
                    </p>
                    <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.contributionsThisYear}
                    </div>
                  </div>

                  {/* Lifetime */}
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#161b22]/50 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-purple-600 dark:text-purple-400 font-mono text-xs mb-1">
                      Lifetime Contributions
                    </p>
                    <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {stats.totalContributions}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Graph + Timeline */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            {/* Graph */}
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden flex-shrink-0">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <BarChart className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  activity_graph (52w)
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-[2px] h-24 overflow-hidden">
                  {stats.contributionGraph?.map((count, i) => {
                    const height =
                      maxContribution > 0 ? (count / maxContribution) * 100 : 0;
                    const intensity =
                      height > 75
                        ? "bg-green-500"
                        : height > 50
                          ? "bg-green-500/80"
                          : height > 25
                            ? "bg-green-500/50"
                            : height > 0
                              ? "bg-green-500/30"
                              : "bg-gray-100 dark:bg-gray-800";
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm ${intensity} transition-all duration-300 hover:opacity-80`}
                        style={{ height: height > 0 ? `${height}%` : "1px" }}
                        title={`Week ${i + 1}: ${count} contributions`}
                      />
                    );
                  })}
                  {(!stats.contributionGraph ||
                    stats.contributionGraph.length === 0) && (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-sm">
                      No contribution data available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Snippet */}
            {stats.recentActivity && stats.recentActivity.length > 0 && (
              <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden flex-1">
                <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                  <Activity className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mr-2" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                    recent_events
                  </span>
                </div>
                <div className="p-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                  {stats.recentActivity.map((activity, index) => {
                    let Icon = GitCommit;
                    let color = "text-gray-500";

                    if (activity.type === "push") {
                      Icon = GitCommit;
                      color = "text-purple-500";
                    } else if (activity.type === "star") {
                      Icon = Star;
                      color = "text-yellow-500";
                    } else if (activity.type === "fork") {
                      Icon = GitFork;
                      color = "text-blue-500";
                    } else if (activity.type === "create") {
                      Icon = CheckCircle2;
                      color = "text-green-500";
                    } else if (activity.type === "pr") {
                      Icon = GitBranch;
                      color = "text-cyan-500";
                    }

                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-3 hover:bg-gray-50 dark:hover:bg-[#161b22]/50 rounded-md transition-colors group"
                      >
                        <div className={`mt-0.5 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0 font-mono text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-gray-900 dark:text-gray-200 truncate font-semibold">
                              {activity.repo}
                            </span>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {activity.timeAgo}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                            {activity.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Top Repositories */}
        {stats.topRepos && stats.topRepos.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <FolderGit2 className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  ls -la ./top_repositories
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.topRepos.map((repo, i) => (
                    <a
                      key={i}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#161b22]/30 hover:border-green-500/50 hover:bg-white dark:hover:bg-[#161b22] transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate pr-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Third Party Gamification Integration */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* GitHub Readme Stats */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <BarChart className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  fetch ./readme-stats
                </span>
              </div>
              <div className="p-6 flex flex-col md:flex-row justify-center items-center gap-4 overflow-x-auto custom-scrollbar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${stats.username}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&title_color=667eea&icon_color=f093fb&text_color=ffffff`}
                  alt="GitHub Stats"
                  className="h-[180px] hover:scale-[1.02] transition-transform duration-300"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${stats.username}&layout=compact&theme=radical&hide_border=true&bg_color=0D1117&title_color=667eea&text_color=ffffff`}
                  alt="Top Languages"
                  className="h-[180px] hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Streak Stats */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Flame className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  fetch ./streak-stats
                </span>
              </div>
              <div className="p-6 flex justify-center items-center overflow-x-auto custom-scrollbar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${stats.username}&theme=radical&hide_border=true&background=0D1117&stroke=667eea&ring=f093fb&fire=f093fb&currStreakLabel=667eea`}
                  alt="GitHub Streak"
                  className="hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Profile Details Cards */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  fetch ./profile-details
                </span>
              </div>
              <div className="p-6 flex flex-col items-center gap-4 overflow-x-auto custom-scrollbar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${stats.username}&theme=radical`}
                  alt="Profile Details"
                  className="w-[95%] max-w-4xl hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${stats.username}&theme=radical`}
                    alt="Repos per Language"
                    className="h-[180px] hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${stats.username}&theme=radical`}
                    alt="Productive Time"
                    className="h-[180px] hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trophies Widget */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Medal className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  fetch ./achievements.svg
                </span>
              </div>
              <div className="p-6 flex justify-center items-center overflow-x-auto custom-scrollbar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-profile-trophy.vercel.app/?username=${stats.username}&theme=radical&no-frame=true&no-bg=true&margin-w=10&margin-h=10&column=7`}
                  alt="GitHub Trophies"
                  className="max-w-none hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Activity Graph Widget */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Activity className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                  generate --type=activity-graph
                </span>
              </div>
              <div className="p-6 flex justify-center w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${stats.username}&theme=tokyo-night&hide_border=true&bg_color=0D1117&color=667eea&line=f093fb&point=ffffff&area=true&area_color=764ba2`}
                  alt="GitHub Activity Graph"
                  className="w-full max-w-4xl hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
