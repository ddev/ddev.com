import featuredSponsors from "../../featured-sponsors.json"
import fs from "fs"
import path from "path"
import sizeOf from "image-size"

const baseUrl = import.meta.env.SITE

// Width of the composed SVG
const overallWidth = 814
// Maximum height and width for leading sponsors
const leadingMaxHeight = 70
const leadingMaxWidth = 250
// Maximum height and width for regular sponsors
const maxHeight = 50
const maxWidth = 200
// Horizontal padding between logos
const xPadding = 40
// Vertical padding between rows of logos
const yPadding = 20

/**
 * Build an SVG response body with rows of evenly-spaced sponsor logos wrapped in anchors.
 * @returns string
 */
const buildResponse = () => {
  let images = []
  let totalHeight = 0
  let currentX = 0
  let currentY = 0

  // Separate leading sponsors and regular sponsors
  const leadingSponsors = featuredSponsors.filter(sponsor => sponsor.isLeading)
  const regularSponsors = featuredSponsors.filter(sponsor => !sponsor.isLeading)

  console.log("Rendering leading sponsors row...")

  // Render leading sponsors row with larger dimensions
  leadingSponsors.forEach(sponsor => {
    const dimensions = sizeOf("./public/" + sponsor.logo)
    const [w, h] = getScaledImageDimensions(dimensions.width, dimensions.height, leadingMaxHeight, leadingMaxWidth)

    if (currentX + w + xPadding > overallWidth) {
      // Move to the next row if we exceed the overall width
      currentX = 0
      currentY += leadingMaxHeight + yPadding
      console.log("Row break for leading sponsors, Y position updated to:", currentY)
    }

    let yOffset = (leadingMaxHeight - h) / 2

    images.push({
      href: baseUrl + sponsor.logo,
      path: `./public/${sponsor.logo}`,
      x: currentX,
      y: currentY + yOffset,
      height: h,
      width: w,
      url: sponsor.url,
    })

    console.log(`Placed leading sponsor: ${sponsor.name}, Width: ${w}, Height: ${h}, X: ${currentX}, Y: ${currentY + yOffset}`)

    currentX += w + xPadding
  })

  // Enforce row break after leading sponsors
  currentY += leadingMaxHeight + yPadding
  currentX = 0  // Reset X for the next row
  console.log("Starting new row for regular sponsors, Y position updated to:", currentY)

  // Render regular sponsors with regular dimensions
  regularSponsors.forEach(sponsor => {
    const dimensions = sizeOf("./public/" + sponsor.logo)
    const [w, h] = getScaledImageDimensions(dimensions.width, dimensions.height, maxHeight, maxWidth)

    if (currentX + w + xPadding > overallWidth) {
      // Move to the next row if we exceed the overall width
      currentX = 0
      currentY += maxHeight + yPadding
      console.log("Row break for regular sponsors, Y position updated to:", currentY)
    }

    let yOffset = (maxHeight - h) / 2

    images.push({
      href: baseUrl + sponsor.logo,
      path: `./public/${sponsor.logo}`,
      x: currentX,
      y: currentY + yOffset,
      height: h,
      width: w,
      url: sponsor.url,
    })

    console.log(`Placed regular sponsor: ${sponsor.name}, Width: ${w}, Height: ${h}, X: ${currentX}, Y: ${currentY + yOffset}`)

    currentX += w + xPadding
  })

  totalHeight = currentY + maxHeight + yPadding

  // Generate SVG content
  let response = `
    <svg
      width="${overallWidth}"
      height="${totalHeight}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
  `

  images.map(image => {
    response += `
      <a xlink:href="${image.url}" target="_blank">
        <image href="${imgToBase64(image.path)}" x="${image.x}" y="${image.y}" height="${image.height}" width="${image.width}" />
      </a>
    `
  })

  response += `</svg>`

  return response;
}

function imgToBase64(filePath) {
  let extname = path.extname(filePath).slice(1) || 'png'

  if (extname === 'svg') {
    extname = "svg+xml"
  }

  return 'data:image/' + extname + ';base64,' + fs.readFileSync(filePath).toString('base64')
}

/**
 * Scales image dimensions based on provided max height and width.
 * @param {*} width
 * @param {*} height
 * @param {*} maxRowHeight
 * @param {*} maxRowWidth
 * @returns [w, h]
 */
const getScaledImageDimensions = (width, height, maxRowHeight, maxRowWidth) => {
  let h = maxRowHeight
  let w = (maxRowHeight / height) * width
  if (w > maxRowWidth) {
    w = maxRowWidth
    h = (maxRowWidth / width) * height
  }
  return [w, h]
}

export async function GET({ params, request }) {
  return new Response(buildResponse())
}
