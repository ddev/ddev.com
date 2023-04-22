import featuredSponsors from "../../featured-sponsors.json"
import sizeOf from "image-size"
import base64Img from "base64-img"

const baseUrl = import.meta.env.SITE

const overallWidth = 814
const maxHeight = 50
const maxWidth = 200
const xPadding = 40
const yPadding = 20

let images = []
let totalHeight = 0
let currentX = 0
let currentY = 0
let rowCount = 1

featuredSponsors.map((sponsor, index) => {
  const dimensions = sizeOf("./public/" + sponsor.logo)
  const fullW = dimensions.width
  const fullH = dimensions.height

  let h = fullH
  let w = fullW
  let ratio = w / h

  if (ratio < 1) {
    h = maxHeight
    w = (maxHeight / fullH) * fullW
  }

  if (ratio === 1) {
    h = maxHeight
    w = maxHeight
  }

  if (ratio > 1) {
    h = maxHeight
    w = (maxHeight / fullH) * fullW
  }

  if (ratio > 2) {
    h = maxHeight * 0.75
    w = ((maxHeight * 0.75) / fullH) * fullW
  }

  if (ratio > 3) {
    w = maxWidth
    h = (maxWidth / fullW) * fullH
  }

  console.log(sponsor.name + ": " + ratio)

  if (currentX + w + xPadding > overallWidth) {
    currentX = 0
    currentY += maxHeight + yPadding
    rowCount += 1
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
  const imgData = base64Img.base64Sync(image.path)

  response += `
    <a xlink:href="${image.url}" target="_blank">
      <image href="${imgData}" x="${image.x}" y="${image.y}" height="${image.height}" width="${image.width}" />
    </a>
  `
})

response += `</svg>`

export async function get({ params, request }) {
  return {
    body: response,
  }
}
