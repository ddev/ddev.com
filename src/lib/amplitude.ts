/**
 * Fetches live DDEV usage stats from Amplitude at build time.
 */

import dotenv from "dotenv"
import { getCache, putCache } from "./api"
import {
  getSampleChart,
  getSampleMacosArchitecture,
  getSampleMonthlyUserHistory,
  getSampleProjectProperty,
} from "./amplitude-sample-data"

dotenv.config()

// Saved chart IDs behind each usage-stats section (see https://app.amplitude.com/analytics/ddev/home)
export const AMPLITUDE_CHARTS = {
  environment: "vkdc4w6s",
  commands: "bzk6dz2u",
  cmsProjectTypes: "jz0wqx1w",
  macosDockerProviders: "2orxojlh",
  wsl2DockerProviders: "5o615zus",
  addOns: "3iqv1isv",
  ddevPull: "3amvlqjp",
  versions: "p2qwr8n6",
  timezones: "s42r2mvx",
} as const

// Public, unauthenticated "Share" links for each saved chart above, so
// visitors can explore the live data themselves without an Amplitude login.
// There's no API to mint these; they're created via the Amplitude UI.
export const AMPLITUDE_SHARE_LINKS: Partial<
  Record<keyof typeof AMPLITUDE_CHARTS, string>
> = {
  environment:
    "https://app.amplitude.com/analytics/share/1238aca77448459aac7473f2fedbe109",
  commands:
    "https://app.amplitude.com/analytics/share/f4e48d8678134561ae034f9a020faab4",
  cmsProjectTypes:
    "https://app.amplitude.com/analytics/share/0619ab47f9cd433cb14bdea4b4aab3e2",
  macosDockerProviders:
    "https://app.amplitude.com/analytics/share/07d652c6e14e44c68b192625ea8ee066",
  wsl2DockerProviders:
    "https://app.amplitude.com/analytics/share/dad41af1c2a44bb6af1d6ec8cad65bd7",
  addOns:
    "https://app.amplitude.com/analytics/share/4e4959f0f36c49d6a24cc2726e8231e5",
  ddevPull:
    "https://app.amplitude.com/analytics/share/4837a47cab1b46eb95c8a4b73f3a5bb2",
  versions:
    "https://app.amplitude.com/analytics/share/a0fde21314e34378831943af7f9dd022",
  timezones:
    "https://app.amplitude.com/analytics/share/5735804e9a83429cb6d131b62aa174a6",
}

const amplitudeCredentialsSet: boolean = (() => {
  if (!process.env.AMPLITUDE_API_KEY || !process.env.AMPLITUDE_SECRET_KEY) {
    if (import.meta.env.PROD) {
      console.warn(
        "AMPLITUDE_API_KEY/AMPLITUDE_SECRET_KEY not set. You can ignore this warning for local development."
      )
    }
    return false
  }
  return true
})()

// Without credentials, fall back to sample data (see ./amplitude-sample-data),
// except on the real Cloudflare Pages deploy (CF_PAGES), which should show the
// "data isn't available" notice rather than fabricated numbers. Not PROD-gated:
// `astro build` sets PROD for the local build too, where we do want samples.
const useSampleData = !amplitudeCredentialsSet && !process.env.CF_PAGES

const authHeader = () =>
  "Basic " +
  Buffer.from(
    `${process.env.AMPLITUDE_API_KEY}:${process.env.AMPLITUDE_SECRET_KEY}`
  ).toString("base64")

export type AmplitudeChartRow = {
  label: string
  values: number[]
}

export type AmplitudeChart = {
  title: string
  // "Totals" (safe to sum across columns) or "Uniques" (a user counted in
  // multiple columns would be double-counted by summing, so only the most
  // recent column should be treated as the current value).
  metric: string
  columns: string[]
  rows: AmplitudeChartRow[]
}

/**
 * Parses one CSV line into fields, honoring quoted fields with embedded
 * commas and escaped ("") quotes, and stripping Amplitude's leading tab
 * character from each field.
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ",") {
      fields.push(current)
      current = ""
    } else {
      current += char
    }
  }
  fields.push(current)

  return fields.map((field) => field.replace(/^\t/, ""))
}

/**
 * Amplitude's chart CSV export mixes a title, metric label, and filter
 * description above the actual data table, separated by blank lines. The
 * data table (header row + data rows) is always the last such block.
 */
function parseAmplitudeChartCsv(csvText: string): AmplitudeChart {
  const lines = csvText.split(/\r\n/)
  const titleRow = parseCsvLine(lines[0] ?? "")
  const title = titleRow[0] ?? ""

  const blocks: string[][][] = [[]]
  for (const line of lines.slice(1)) {
    if (line === "") {
      if (blocks[blocks.length - 1].length > 0) {
        blocks.push([])
      }
      continue
    }
    blocks[blocks.length - 1].push(parseCsvLine(line))
  }

  const nonEmptyBlocks = blocks.filter((block) => block.length > 0)
  const metric = nonEmptyBlocks[0]?.[0]?.[0] ?? ""
  const dataBlock = nonEmptyBlocks.pop() ?? []
  const [header, ...dataRows] = dataBlock

  return {
    title,
    metric,
    columns: (header ?? []).slice(1),
    rows: dataRows.map((row) => ({
      label: row[0] ?? "",
      values: row.slice(1).map((value) => parseFloat(value) || 0),
    })),
  }
}

export type PercentageRow = {
  label: string
  count: number
  percent: number
}

/**
 * Reduces a parsed chart's rows to a single {label, count, percent} per row,
 * for rendering as a simple bar list.
 *
 * "composition" charts (Amplitude's pie/donut charts) already export a
 * count column and a percent-of-total column per row, which are used as-is.
 *
 * "segmentation" charts (Amplitude's bar/line charts) export either one
 * value column (already the metric for the full range) or several
 * (one per day/week/month). For the additive "Totals" metric, those
 * columns are summed; for "Uniques" (or anything else), summing would
 * double-count users seen in multiple columns, so only the most recent
 * column is used as the current value.
 */
export function toPercentageRows(
  chart: AmplitudeChart,
  kind: "composition" | "segmentation",
  options: { exclude?: string[] } = {}
): PercentageRow[] {
  const exclude = new Set(options.exclude ?? [])

  if (kind === "composition") {
    const counts = chart.rows
      .filter((row) => !exclude.has(row.label))
      .map((row) => ({ label: row.label, count: row.values[0] ?? 0 }))
      .filter((row) => row.count > 0)
    const grandTotal = counts.reduce((sum, row) => sum + row.count, 0) || 1

    return counts
      .map((row) => ({ ...row, percent: (row.count / grandTotal) * 100 }))
      .sort((a, b) => b.count - a.count)
  }

  // For multi-column "Uniques" data, the most recent column is often a
  // still-accumulating partial period (e.g. "today", not yet over), so the
  // most recently *complete* column (second-to-last) is used instead.
  const uniquesColumnIndex =
    chart.columns.length > 1
      ? chart.columns.length - 2
      : chart.columns.length - 1

  const counts = chart.rows
    .filter((row) => !exclude.has(row.label))
    .map((row) => ({
      label: row.label,
      count:
        chart.metric === "Totals"
          ? row.values.reduce((sum, value) => sum + value, 0)
          : (row.values[uniquesColumnIndex] ?? 0),
    }))
    // A count of 0 in the selected column usually just means that row had
    // usage in an earlier or later (excluded, partial) column instead —
    // not that it's genuinely unused. Not worth showing either way.
    .filter((row) => row.count > 0)
  const grandTotal = counts.reduce((sum, row) => sum + row.count, 0) || 1

  return counts
    .map((row) => ({ ...row, percent: (row.count / grandTotal) * 100 }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Gets the parsed data for a saved Amplitude chart by chart ID.
 * Returns null when Amplitude credentials aren't configured.
 */
export async function getAmplitudeChart(
  chartId: string
): Promise<AmplitudeChart | null> {
  const cacheFilename = `amplitude-chart-${chartId}.json`
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  if (!amplitudeCredentialsSet) {
    return useSampleData
      ? getSampleChart(SAMPLE_CHART_KEY_BY_ID[chartId] ?? "")
      : null
  }

  const response = await fetch(
    `https://amplitude.com/api/3/chart/${chartId}/csv`,
    {
      headers: { Authorization: authHeader() },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Amplitude chart request failed for ${chartId}: HTTP ${response.status}`
    )
  }

  const { data: csvText } = await response.json()
  const chart = parseAmplitudeChartCsv(csvText)

  putCache(cacheFilename, JSON.stringify(chart))

  return chart
}

export type MonthlyUserHistory = {
  monthStartDates: string[]
  uniqueUsers: number[]
}

/**
 * Gets monthly unique-user counts for close to the longest range Amplitude's
 * data retention allows (roughly the trailing 12 months), via an ad hoc
 * Events Segmentation query rather than a saved chart, so the range isn't
 * capped by a chart's fixed date-range setting.
 *
 * Monthly (rather than weekly) buckets are used deliberately: a single
 * holiday week (e.g. Christmas/New Year) reads as an alarming cliff on a
 * weekly chart, but barely registers once averaged across a whole month.
 */
export async function getMonthlyUserHistory(): Promise<MonthlyUserHistory | null> {
  const cacheFilename = "amplitude-monthly-user-history.json"
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  if (!amplitudeCredentialsSet) {
    return useSampleData ? getSampleMonthlyUserHistory() : null
  }

  const end = new Date()
  // 11 months before the current month, so requesting through today gives
  // 12 buckets (11 complete months + the current partial one, dropped
  // below) while staying safely inside the ~12-month retention window.
  const start = new Date(end.getFullYear(), end.getMonth() - 11, 1)
  const toYyyymmdd = (date: Date) =>
    date.toISOString().slice(0, 10).replace(/-/g, "")

  const params = new URLSearchParams({
    e: JSON.stringify({ event_type: "Project" }),
    start: toYyyymmdd(start),
    end: toYyyymmdd(end),
    i: "30",
    m: "uniques",
  })

  const response = await fetch(
    `https://amplitude.com/api/2/events/segmentation?${params.toString()}`,
    {
      headers: { Authorization: authHeader() },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Amplitude segmentation request failed: HTTP ${response.status}`
    )
  }

  const { data } = await response.json()
  // Drop the most recent month: with `end` set to today, its bucket is
  // still accumulating and would show as a misleading dip.
  const history: MonthlyUserHistory = {
    monthStartDates: data.xValues.slice(0, -1),
    uniqueUsers: data.series[0].slice(0, -1),
  }

  putCache(cacheFilename, JSON.stringify(history))

  return history
}

export type PropertyBreakdown = {
  rows: PercentageRow[]
}

/**
 * Gets macOS CPU architecture (Apple Silicon vs. Intel) usage, scoped to
 * darwin users only via an ad hoc Events Segmentation query. The saved
 * "Usage by Architecture" chart has no OS filter at all, so it mixes in
 * Linux/Windows amd64 machines and understates Apple Silicon's real share
 * among macOS users.
 */
export async function getMacosArchitecture(): Promise<PropertyBreakdown | null> {
  const cacheFilename = "amplitude-macos-architecture.json"
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  if (!amplitudeCredentialsSet) {
    return useSampleData ? getSampleMacosArchitecture() : null
  }

  const end = new Date()
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
  const toYyyymmdd = (date: Date) =>
    date.toISOString().slice(0, 10).replace(/-/g, "")

  const params = new URLSearchParams({
    e: JSON.stringify({ event_type: "_all" }),
    start: toYyyymmdd(start),
    end: toYyyymmdd(end),
    i: "1",
    m: "uniques",
    s: JSON.stringify([
      { prop: "gp:DDEV Environment", op: "is", values: ["darwin"] },
    ]),
    g: "platform",
  })

  const response = await fetch(
    `https://amplitude.com/api/2/events/segmentation?${params.toString()}`,
    {
      headers: { Authorization: authHeader() },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Amplitude segmentation request failed: HTTP ${response.status}`
    )
  }

  const { data } = await response.json()
  // seriesCollapsed gives the properly deduplicated unique count across the
  // whole date range per group, avoiding both the "sum double-counts
  // uniques across days" and "last day is partial" pitfalls.
  const counts = data.seriesLabels.map((label: string, index: number) => ({
    label,
    count: data.seriesCollapsed[index]?.[0]?.value ?? 0,
  }))
  const grandTotal = counts.reduce(
    (sum: number, row: { count: number }) => sum + row.count,
    0
  )

  const breakdown: PropertyBreakdown = {
    rows: counts
      .map((row) => ({
        ...row,
        percent: grandTotal ? (row.count / grandTotal) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count),
  }

  putCache(cacheFilename, JSON.stringify(breakdown))

  return breakdown
}

/**
 * Gets a breakdown of unique users by a property scoped to DDEV's "Project"
 * event (e.g. "PHP Version", "Database Type"), via an ad hoc Events
 * Segmentation query. These properties only exist on that one event type,
 * so they need an inline `group_by` in the event definition rather than the
 * top-level `g` param used above for `platform` (a property Amplitude
 * tracks globally on every event).
 */
async function getProjectPropertyBreakdown(
  propertyName: string,
  options: { exclude?: string[] } = {}
): Promise<PropertyBreakdown | null> {
  const cacheKey = propertyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const cacheFilename = `amplitude-project-property-${cacheKey}.json`
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  if (!amplitudeCredentialsSet) {
    return useSampleData ? getSampleProjectProperty(propertyName) : null
  }

  const end = new Date()
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
  const toYyyymmdd = (date: Date) =>
    date.toISOString().slice(0, 10).replace(/-/g, "")

  const params = new URLSearchParams({
    e: JSON.stringify({
      event_type: "Project",
      group_by: [{ type: "event", value: propertyName }],
    }),
    start: toYyyymmdd(start),
    end: toYyyymmdd(end),
    i: "1",
    m: "uniques",
  })

  const response = await fetch(
    `https://amplitude.com/api/2/events/segmentation?${params.toString()}`,
    {
      headers: { Authorization: authHeader() },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Amplitude segmentation request failed: HTTP ${response.status}`
    )
  }

  const { data } = await response.json()
  const exclude = new Set(options.exclude ?? [])
  // Inline group_by returns seriesLabels as [groupIndex, label] pairs,
  // unlike the plain string labels the top-level `g` param returns above.
  const counts = data.seriesLabels
    .map((entry: string | [number, string], index: number) => ({
      label: Array.isArray(entry) ? entry[1] : entry,
      count: data.seriesCollapsed[index]?.[0]?.value ?? 0,
    }))
    .filter(
      (row: { label: string; count: number }) =>
        !exclude.has(row.label) && row.count > 0
    )
  const grandTotal = counts.reduce(
    (sum: number, row: { count: number }) => sum + row.count,
    0
  )

  const breakdown: PropertyBreakdown = {
    rows: counts
      .map((row) => ({
        ...row,
        percent: grandTotal ? (row.count / grandTotal) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count),
  }

  putCache(cacheFilename, JSON.stringify(breakdown))

  return breakdown
}

export function getPhpVersions(): Promise<PropertyBreakdown | null> {
  return getProjectPropertyBreakdown("PHP Version", { exclude: ["(none)"] })
}

export function getDatabaseTypes(): Promise<PropertyBreakdown | null> {
  return getProjectPropertyBreakdown("Database Type", {
    exclude: ["(none)"],
  })
}

// Maps each saved chart's ID back to its AMPLITUDE_CHARTS key, so the
// chartId-based getAmplitudeChart() can look up sample data (keyed by name).
const SAMPLE_CHART_KEY_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(AMPLITUDE_CHARTS).map(([key, id]) => [id, key])
)
