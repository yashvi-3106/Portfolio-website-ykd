import { NextResponse } from "next/server"

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql"

const QUERY = `
  query getUser($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum { difficulty count submissions }
        totalSubmissionNum { difficulty count submissions }
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
    }
    recentSubmissionList(username: $username, limit: 5) {
      title
      titleSlug
      statusDisplay
      lang
      timestamp
      difficulty
    }
  }
`

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("u") || "yashvi_3106"

    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com/",
        "Origin": "https://leetcode.com",
        // A generic UA to avoid being blocked
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      cache: "no-store",
    })

    if (!res.ok) {
      // Fallback to profile page scrape
      const fallback = await scrapeLeetCodeProfile(username)
      if (fallback) return NextResponse.json(fallback)
      return NextResponse.json({ error: `Failed to fetch LeetCode stats (${res.status})` }, { status: 500 })
    }

    const json = await res.json()
    if (json.errors?.length) {
      const fallback = await scrapeLeetCodeProfile(username)
      if (fallback) return NextResponse.json(fallback)
      return NextResponse.json({ error: json.errors[0]?.message || "LeetCode GraphQL error" }, { status: 500 })
    }
    const data = json.data
    if (!data?.matchedUser) {
      const fallback = await scrapeLeetCodeProfile(username)
      if (fallback) return NextResponse.json(fallback)
      return NextResponse.json({ error: "LeetCode user not found" }, { status: 404 })
    }

    const ac = data.matchedUser.submitStatsGlobal.acSubmissionNum
    const total = data.matchedUser.submitStatsGlobal.totalSubmissionNum

    const byDiff: Record<string, { ac: number; total: number }> = {}
    for (const item of ac) {
      byDiff[item.difficulty] = { ac: item.count, total: 0 }
    }
    for (const item of total) {
      byDiff[item.difficulty] = {
        ac: byDiff[item.difficulty]?.ac || 0,
        total: item.count,
      }
    }

    const easySolved = byDiff["Easy"]?.ac || 0
    const mediumSolved = byDiff["Medium"]?.ac || 0
    const hardSolved = byDiff["Hard"]?.ac || 0
    const totalSolved = easySolved + mediumSolved + hardSolved

    const totalSubs = (byDiff["Easy"]?.total || 0) + (byDiff["Medium"]?.total || 0) + (byDiff["Hard"]?.total || 0)
    const acceptanceRate = totalSubs > 0 ? Math.round((totalSolved / totalSubs) * 1000) / 10 : null

    const recent = (data.recentSubmissionList || []).map((s: any) => ({
      problem: s.title,
      difficulty: s.difficulty || "",
      status: s.statusDisplay,
      date: s.timestamp ? new Date(Number(s.timestamp) * 1000).toLocaleString() : "",
      slug: s.titleSlug,
    }))

    const rating = data.userContestRanking?.rating || null
    const ranking = data.userContestRanking?.globalRanking || null

    return NextResponse.json({
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking,
      contestRating: rating ? Math.round(rating) : null,
      badges: null,
      streak: null,
      recentSubmissions: recent,
    })
  } catch (e: any) {
    // On any unexpected error, try fallback scrape once
    try {
      const { searchParams } = new URL(request.url)
      const username = searchParams.get("u") || "yashvi_3106"
      const fallback = await scrapeLeetCodeProfile(username)
      if (fallback) return NextResponse.json(fallback)
    } catch {}
    return NextResponse.json({ error: e?.message || "Failed to fetch LeetCode stats" }, { status: 500 })
  }
}

async function scrapeLeetCodeProfile(username: string) {
  try {
    const url = `https://leetcode.com/u/${username}/`
    const res = await fetch(url, {
      headers: {
        "Referer": "https://leetcode.com/",
        "Origin": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    })
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
    if (!match) return null
    const data = JSON.parse(match[1])

    // Search recursively for submission stats
    const stats = findInObject(data, (obj: any) =>
      obj && typeof obj === 'object' &&
      Array.isArray(obj.acSubmissionNum) && Array.isArray(obj.totalSubmissionNum)
    )
    if (!stats) return null

    const ac = stats.acSubmissionNum
    const total = stats.totalSubmissionNum
    const byDiff: Record<string, { ac: number; total: number }> = {}
    for (const item of ac) byDiff[item.difficulty] = { ac: item.count, total: 0 }
    for (const item of total) byDiff[item.difficulty] = { ac: byDiff[item.difficulty]?.ac || 0, total: item.count }

    const easySolved = byDiff['Easy']?.ac || 0
    const mediumSolved = byDiff['Medium']?.ac || 0
    const hardSolved = byDiff['Hard']?.ac || 0
    const totalSolved = easySolved + mediumSolved + hardSolved
    const totalSubs = (byDiff['Easy']?.total || 0) + (byDiff['Medium']?.total || 0) + (byDiff['Hard']?.total || 0)
    const acceptanceRate = totalSubs > 0 ? Math.round((totalSolved / totalSubs) * 1000) / 10 : null

    // Try to find contest info
    const contest = findInObject(data, (obj: any) => obj && typeof obj === 'object' && 'rating' in obj && 'globalRanking' in obj)
    const contestRating = contest?.rating ? Math.round(contest.rating) : null
    const ranking = contest?.globalRanking ?? null

    // We don't parse recent submissions reliably here
    const recentSubmissions: any[] = []

    return {
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking,
      contestRating,
      badges: null,
      streak: null,
      recentSubmissions,
    }
  } catch {
    return null
  }
}

function findInObject(root: any, predicate: (obj: any) => boolean): any | null {
  const visited = new Set<any>()
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    if (!cur || typeof cur !== 'object') continue
    if (visited.has(cur)) continue
    visited.add(cur)
    if (predicate(cur)) return cur
    for (const k in cur) {
      try {
        const v = (cur as any)[k]
        if (v && typeof v === 'object') stack.push(v)
      } catch {}
    }
  }
  return null
}
