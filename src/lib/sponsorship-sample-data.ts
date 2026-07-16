/**
 * Sample fallback data for the usage-stats sponsorship section, used only when
 * GITHUB_TOKEN isn't set (see `useSampleData` in ./api). Like the Amplitude
 * fallback in ./amplitude-sample-data, the numbers are generated (seeded, so
 * builds stay stable) rather than hardcoded. The type-only import is erased at
 * build time, so there's no runtime dependency on ./api.
 */

import type { SponsorshipHistory } from "./api"

// Deterministic string hash → [0, 1), for stable per-point jitter.
function seededUnit(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return ((hash >>> 0) % 100000) / 100000
}

const MONTHS = 12
const GOAL = 12000

// Monthly recurring income trending from ~8K toward the goal, with jitter.
function monthlyIncome(): number[] {
  return Array.from({ length: MONTHS }, (_, index) => {
    const trend = 6000 + (3200 * index) / (MONTHS - 1)
    const jitter = 0.96 + 0.08 * seededUnit(`income-${index}`)
    return Math.round(trend * jitter)
  })
}

// Trailing 12 months of sample income, ending with the current month.
export function getSampleSponsorshipHistory(): SponsorshipHistory {
  const income = monthlyIncome()
  const now = new Date()
  const monthStartDates = income.map((_, index) => {
    const date = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth() - (MONTHS - 1 - index),
        1
      )
    )
    return date.toISOString().slice(0, 10)
  })
  return { monthStartDates, monthlyIncome: income }
}

// Shaped like the fields the usage-stats page reads off /s/sponsorship-data.json.
export function getSampleSponsorshipData() {
  const income = monthlyIncome()
  const current = income[income.length - 1]
  return {
    total_monthly_average_income: current,
    current_goal: {
      target_amount: GOAL,
      progress_percentage: (current / GOAL) * 100,
    },
  }
}
