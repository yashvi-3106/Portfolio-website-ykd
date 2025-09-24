import { NextResponse } from "next/server"

const GITHUB_API = "https://api.github.com"

async function fetchAllRepos(username: string, token?: string) {
  const perPage = 100
  let page = 1
  let all: any[] = []

  while (true) {
    const url = `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&page=${page}&type=owner&sort=updated`
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      // On Vercel/Next edge, ensure fresh fetch
      cache: "no-store",
    })
    if (!res.ok) break
    const repos = await res.json()
    all = all.concat(repos)
    if (repos.length < perPage) break
    page += 1
    // Safety cap
    if (page > 10) break
  }

  return all
}

function computeLanguageDistribution(repos: any[]) {
  const counts: Record<string, number> = {}
  let total = 0
  for (const r of repos) {
    const lang = r.language || "Other"
    counts[lang] = (counts[lang] || 0) + 1
    total += 1
  }
  const entries = Object.entries(counts)
    .map(([name, count]) => ({ name, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.percentage - a.percentage)

  // Trim to top 5 and normalize to 100
  const top = entries.slice(0, 5)
  const sum = top.reduce((acc, e) => acc + e.percentage, 0)
  if (sum !== 100 && top.length > 0) {
    const diff = 100 - sum
    top[0].percentage = Math.max(0, top[0].percentage + diff)
  }
  return top
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("u") || "yashvi-3106"
    const token = process.env.GITHUB_TOKEN

    // Basic user info
    const userRes = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    })
    if (!userRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
    }
    const user = await userRes.json()

    const repos = await fetchAllRepos(username, token)

    let totalStars = 0
    let totalForks = 0
    let totalCommits = 0 // Commit counts per-repo would require additional requests; omit for now or estimate

    for (const r of repos) {
      totalStars += r.stargazers_count || 0
      totalForks += r.forks_count || 0
    }

    const languages = computeLanguageDistribution(repos)

    // Try to enrich via GraphQL if token available
    let contributionsThisYear: number | null = null
    let totalCommitContributions: number | null = null
    if (token) {
      try {
        const gql = `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar { totalContributions }
                totalCommitContributions
              }
            }
          }
        `
        const gqlRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: gql, variables: { login: username } }),
        })
        if (gqlRes.ok) {
          const gqlJson = await gqlRes.json()
          const cc = gqlJson?.data?.user?.contributionsCollection
          contributionsThisYear = cc?.contributionCalendar?.totalContributions ?? null
          totalCommitContributions = cc?.totalCommitContributions ?? null
        }
      } catch {}
    }

    return NextResponse.json({
      username,
      profileUrl: `https://github.com/${username}`,
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      totalCommits: totalCommitContributions ?? totalCommits,
      contributionsThisYear,
      longestStreak: null,
      currentStreak: null,
      languages,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to fetch GitHub stats" }, { status: 500 })
  }
}
