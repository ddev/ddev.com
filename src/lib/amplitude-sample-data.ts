/**
 * Sample fallback data for the usage-stats page, used only when Amplitude
 * credentials aren't configured (see `useSampleData` in ./amplitude). Only the
 * category labels are fixed; counts are generated as a decaying distribution,
 * deterministically (seeded off each label) so builds stay stable.
 */

import type {
  AmplitudeChart,
  MonthlyUserHistory,
  PropertyBreakdown,
} from "./amplitude"

// Deterministic string hash → [0, 1), for stable per-label jitter.
function seededUnit(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return ((hash >>> 0) % 100000) / 100000
}

// Ordered labels → descending counts: `base` * `decay`^index, plus jitter.
function decayingCounts(
  labels: string[],
  base: number,
  decay: number
): [string, number][] {
  return labels.map((label, index) => {
    const jitter = 0.8 + 0.4 * seededUnit(label)
    const count = Math.max(1, Math.round(base * decay ** index * jitter))
    return [label, count]
  })
}

// label/count pairs → PropertyBreakdown (adds percent, sorts).
function toBreakdown(pairs: [string, number][]): PropertyBreakdown {
  const total = pairs.reduce((sum, [, count]) => sum + count, 0) || 1
  return {
    rows: pairs
      .map(([label, count]) => ({
        label,
        count,
        percent: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count),
  }
}

type ChartSpec = {
  title: string
  labels: string[]
  base: number
  decay: number
}

// Keyed by the same keys as AMPLITUDE_CHARTS in ./amplitude.
const CHART_SPECS: Record<string, ChartSpec> = {
  environment: {
    title: "DDEV Environment",
    base: 12000,
    decay: 0.55,
    labels: [
      "darwin",
      "linux",
      "wsl2",
      "windows",
      "wsl2-mirrored",
      "codespaces",
      "wsl2-virtioproxy",
    ],
  },
  commands: {
    title: "DDEV Commands",
    base: 900000,
    decay: 0.72,
    labels: [
      "exec",
      "mysql",
      "describe",
      "wp",
      "custom-command",
      "status",
      "composer",
      "php",
      "start",
      "artisan",
      "xdebug",
      "typo3",
      "npm",
      "restart",
      "stop",
      "ssh",
      "craft",
      "magento",
    ],
  },
  cmsProjectTypes: {
    title: "CMS Project Types",
    base: 5000,
    decay: 0.82,
    labels: [
      "drupal11",
      "php",
      "drupal10",
      "wordpress",
      "laravel",
      "typo3",
      "craftcms",
      "drupal9",
      "symfony",
      "magento2",
      "shopware6",
      "generic",
      "drupal7",
      "drupal8",
      "wp-bedrock",
      "silverstripe",
      "cakephp",
      "backdrop",
    ],
  },
  macosDockerProviders: {
    title: "macOS Docker Providers",
    base: 6800,
    decay: 0.4,
    labels: [
      "docker-desktop",
      "orbstack",
      "colima",
      "rancher-desktop",
      "lima-rootless",
      "lima",
      "linux-docker",
      "podman-selinux",
    ],
  },
  wsl2DockerProviders: {
    title: "WSL2 Docker Providers",
    base: 2900,
    decay: 0.4,
    labels: [
      "wsl2-docker-ce",
      "docker-desktop",
      "rancher-desktop",
      "podman-rootless",
      "podman",
    ],
  },
  addOns: {
    title: "Add-on Usage",
    base: 5000,
    decay: 0.72,
    labels: [
      "redis",
      "solr",
      "adminer",
      "ddev-cron",
      "elasticsearch",
      "ddev-opensearch",
      "ddev-selenium-standalone-chrome",
      "memcached",
      "varnish",
      "rabbitmq",
      "ddev-browsersync",
      "ddev-vite-sidecar",
      "typo3-solr",
      "minio",
    ],
  },
  ddevPull: {
    title: "Bundled ddev pull Usage",
    base: 10000,
    decay: 0.5,
    labels: ["pantheon", "acquia", "platform", "upsun", "lagoon"],
  },
  versions: {
    title: "DDEV Versions",
    base: 10000,
    decay: 0.45,
    labels: [
      "v1.25.2",
      "v1.25.3",
      "v1.25.1",
      "v1.24.10",
      "v1.25.0",
      "v1.24.7",
      "v1.24.6",
      "v1.24.8",
    ],
  },
  timezones: {
    title: "Users by Timezone",
    base: 10000,
    decay: 0.5,
    labels: ["CEST", "EDT", "IST", "EEST", "BST", "UTC", "CDT", "PDT"],
  },
}

type PropertySpec = { labels: string[]; base: number; decay: number }

// Keyed by the property names passed to getProjectPropertyBreakdown().
const PROPERTY_SPECS: Record<string, PropertySpec> = {
  "PHP Version": {
    base: 11000,
    decay: 0.72,
    labels: [
      "8.3",
      "8.4",
      "8.2",
      "8.1",
      "8.5",
      "7.4",
      "8.0",
      "7.2",
      "7.3",
      "7.1",
      "7.0",
    ],
  },
  "Database Type": {
    base: 14500,
    decay: 0.42,
    labels: ["mariadb", "mysql", "postgres"],
  },
}

// Sample chart for an AMPLITUDE_CHARTS key (single value per row works for
// both the "composition" and "segmentation" paths in toPercentageRows()).
export function getSampleChart(key: string): AmplitudeChart | null {
  const spec = CHART_SPECS[key]
  if (!spec) {
    return null
  }
  return {
    title: spec.title,
    metric: "Totals",
    columns: ["Users"],
    rows: decayingCounts(spec.labels, spec.base, spec.decay).map(
      ([label, count]) => ({ label, values: [count] })
    ),
  }
}

// Sample breakdown for a "Project" property name, or null if unknown.
export function getSampleProjectProperty(
  propertyName: string
): PropertyBreakdown | null {
  const spec = PROPERTY_SPECS[propertyName]
  if (!spec) {
    return null
  }
  return toBreakdown(decayingCounts(spec.labels, spec.base, spec.decay))
}

// Sample macOS architecture breakdown (Apple Silicon vs. Intel).
export function getSampleMacosArchitecture(): PropertyBreakdown {
  return toBreakdown(decayingCounts(["arm64", "amd64"], 11000, 0.065))
}

// Sample trailing-11-month user history, trending up, dated to end last month.
export function getSampleMonthlyUserHistory(): MonthlyUserHistory {
  const monthCount = 11
  const uniqueUsers = Array.from({ length: monthCount }, (_, index) => {
    const growth = 1 + 0.03 * index
    const jitter = 0.97 + 0.06 * seededUnit(`month-${index}`)
    return Math.round(22000 * growth * jitter)
  })
  const now = new Date()
  const monthStartDates = uniqueUsers.map((_, index) => {
    const date = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth() - (monthCount - index),
        1
      )
    )
    return date.toISOString().slice(0, 10)
  })
  return { monthStartDates, uniqueUsers }
}
