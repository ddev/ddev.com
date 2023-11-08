import featuredSponsors from "../../featured-sponsors.json"
import sizeOf from "image-size"
import base64Img from "base64-img"

const baseUrl = import.meta.env.SITE

// Width of the composed SVG
const overallWidth = 814
// Maximum height a darklogo may have
const maxHeight = 50
// Maximum width a darklogo may have
const maxWidth = 200
// Horizontal padding between darklogos
const xPadding = 40
// Vertical padding between rows of darklogos
const yPadding = 20

/**
 * Build an SVG response body with rows of evenly-spaced sponsor darklogos wrapped in anchors.
 * @returns string
 */
const buildResponse = () => {
  let images = []
  let totalHeight = 0
  let currentX = 0
  let currentY = 0
  let rowCount = 1

  featuredSponsors.map((sponsor, index) => {
    const dimensions = sizeOf("./public/" + sponsor.darklogo)

    let [w, h] = getScaledImageDimensions(dimensions.width, dimensions.height)

    if (currentX + w + xPadding > overallWidth) {
      currentX = 0
      currentY += maxHeight + yPadding
      rowCount += 1
    }

    let yOffset = (maxHeight - h) / 2

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

  totalHeight = (maxHeight + yPadding) * rowCount

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
        <image href="${base64Img.base64Sync(image.path)}" x="${image.x}" y="${image.y}" height="${image.height}" width="${image.width}" />
      </a>
    `
  })

  response += `</svg>`

  return response;
}

/**
 * Take the original width and height of an image and proportionally scale it
 * for optical balance in this layout.
 * @param {*} width
 * @param {*} height
 * @returns [w, h]
 */
const getScaledImageDimensions = (width, height) => {
  let h = height
  let w = width
  const ratio = w / h

  if (ratio < 1) {
    h = maxHeight
    w = (maxHeight / height) * width
  }

  if (ratio === 1) {
    h = maxHeight
    w = maxHeight
  }

  if (ratio > 1) {
    h = maxHeight
    w = (maxHeight / height) * width
  }

  if (ratio > 2) {
    h = maxHeight * 0.75
    w = ((maxHeight * 0.75) / height) * width
  }

  if (ratio > 3) {
    w = maxWidth
    h = (maxWidth / width) * height
  }

  return [w, h];
}

export async function get({ params, request }) {
  return {
    body: buildResponse(),
  }
}
