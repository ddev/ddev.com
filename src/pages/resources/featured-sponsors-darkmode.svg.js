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
  let rowCount = 1

  featuredSponsors.map((sponsor, index) => {
    // Check if the sponsor is a leading sponsor
    const isLeading = sponsor.isLeading === true

    // Set dimensions based on whether it's a leading sponsor
    const maxRowHeight = isLeading ? leadingMaxHeight : maxHeight
    const maxRowWidth = isLeading ? leadingMaxWidth : maxWidth

    const dimensions = sizeOf("./public/" + sponsor.darklogo)
    let [w, h] = getScaledImageDimensions(dimensions.width, dimensions.height, maxRowHeight, maxRowWidth)

    if (currentX + w + xPadding > overallWidth) {
      currentX = 0
      currentY += maxRowHeight + yPadding
      rowCount += 1
    }

    let yOffset = (maxRowHeight - h) / 2

    images.push({
      href: baseUrl + sponsor.darklogo,
      path: `./public/${sponsor.darklogo}`,
      x: currentX,
      y: currentY + yOffset,
      height: h,
      width: w,
      url: sponsor.url,
    })

    currentX += w + xPadding
  })

  totalHeight = currentY + (rowCount === 1 ? leadingMaxHeight : maxHeight) + yPadding

  let response = `
    <svg
      width="${overallWidth}"
      height="${totalHeight}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
  `

  images.map((image) => {
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
 * Proportionally scales the image dimensions based on the provided max height and width.
 * @param {*} width
 * @param {*} height
 * @param {*} maxRowHeight
 * @param {*} maxRowWidth
 * @returns [w, h]
 */
const getScaledImageDimensions = (width, height, maxRowHeight, maxRowWidth) => {
  let h = height
  let w = width
  const ratio = w / h

  if (ratio < 1) {
    h = maxRowHeight
    w = (maxRowHeight / height) * width
  }

  if (ratio === 1) {
    h = maxRowHeight
    w = maxRowHeight
  }

  if (ratio > 1) {
    h = maxRowHeight
    w = (maxRowHeight / height) * width
  }

  if (ratio > 2) {
    h = maxRowHeight * 0.75
    w = ((maxRowHeight * 0.75) / height) * width
  }

  if (ratio > 3) {
    w = maxRowWidth
    h = (maxRowWidth / width) * height
  }

  return [w, h]
}

export async function GET({ params, request }) {
  return new Response(buildResponse())
}
