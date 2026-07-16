import {
  AMPLITUDE_CHARTS,
  getAmplitudeChart,
  toPercentageRows,
} from "../../lib/amplitude"

const escapeCsvField = (value) => `"${String(value).replace(/"/g, '""')}"`

export async function GET(context) {
  const addOns = await getAmplitudeChart(AMPLITUDE_CHARTS.addOns)
  const rows = addOns
    ? toPercentageRows(addOns, "segmentation", { exclude: ["(none)"] })
    : []

  const lines = [
    ["add_on", "users"].map(escapeCsvField).join(","),
    ...rows.map((row) => [row.label, row.count].map(escapeCsvField).join(",")),
  ]

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ddev-addon-usage.csv"',
    },
  })
}
