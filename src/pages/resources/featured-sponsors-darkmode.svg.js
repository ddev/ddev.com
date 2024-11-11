import featuredSponsors from "../../featured-sponsors.json"
import fs from "fs"
import path from "path"
import sizeOf from "image-size"

const baseUrl = import.meta.env.SITE

// Width of the composed SVG
const overallWidth = 814
// Maximum height a logo may have
const maxHeight = 50
// Lead sponsor height (50% larger than regular sponsors)
const leadSponsorHeight = maxHeight
// Maximum width a logo may have
const maxWidth = 200
// Lead sponsor maximum width (50% larger than regular sponsors)
const leadSponsorMaxWidth = maxWidth
// Horizontal padding between logos
const xPadding = 40
// Vertical padding between rows of logos
const yPadding = 20
// Additional padding below lead sponsors
const leadSponsorBottomPadding = 0

const buildResponse = () => {
  // Debug the full featuredSponsors array
  console.log('All sponsors:', featuredSponsors.map(s => ({ name: s.name, isLeading: s.isLeading })))

  let images = []
  let currentY = 0

  // First process lead sponsors
  const leadSponsors = featuredSponsors.filter(sponsor => sponsor.isLeading === true)
  const regularSponsors = featuredSponsors.filter(sponsor => sponsor.isLeading !== true)

  console.log('Lead sponsors:', leadSponsors.map(s => s.name))
  console.log('Regular sponsors count:', regularSponsors.length)

  // Handle lead sponsors (centered, own row)
  if (leadSponsors.length > 0) {
    console.log('Processing lead sponsors')
    // Get dimensions for lead sponsors
    const leadSponsorInfo = leadSponsors.map(sponsor => {
      const dimensions = sizeOf("./public/" + sponsor.darkLogo)
      console.log(`Lead sponsor ${sponsor.name} original dimensions:`, dimensions)
      const [width, height] = getScaledImageDimensions(
          dimensions.width,
          dimensions.height,
          true // isLeadSponsor
      )
      console.log(`Lead sponsor ${sponsor.name} scaled dimensions: ${width}x${height}`)
      return { sponsor, width, height }
    })

    // Calculate total width including padding between lead sponsors
    const totalLeadWidth = leadSponsorInfo.reduce((sum, info, index) => {
      return sum + info.width + (index < leadSponsors.length - 1 ? xPadding : 0)
    }, 0)

    // Center the lead sponsors
    let startX = (overallWidth - totalLeadWidth) / 2
    console.log('Lead sponsors centered at X:', startX)

    // Place lead sponsors
    leadSponsorInfo.forEach(({ sponsor, width, height }) => {
      images.push({
        href: baseUrl + sponsor.darkLogo,
        path: `./public/${sponsor.darkLogo}`,
        x: startX,
        y: currentY + (leadSponsorHeight - height) / 2,
        height,
        width,
        url: sponsor.url,
        isLead: true
      })

      startX += width + xPadding
    })

    // Move down past lead sponsor row with extra padding
    currentY += leadSponsorHeight + leadSponsorBottomPadding
  } else {
    console.log('No lead sponsors found')
  }

  // Now process regular sponsors
  let currentX = 0
  regularSponsors.forEach((sponsor) => {
    const dimensions = sizeOf("./public/" + sponsor.darkLogo)
    let [width, height] = getScaledImageDimensions(
        dimensions.width,
        dimensions.height,
        false
    )

    // Start new row if needed
    if (currentX + width > overallWidth) {
      currentX = 0
      currentY += maxHeight + yPadding
    }

    images.push({
      href: baseUrl + sponsor.darkLogo,
      path: `./public/${sponsor.darkLogo}`,
      x: currentX,
      y: currentY + (maxHeight - height) / 2,
      height,
      width,
      url: sponsor.url,
      isLead: false
    })

    currentX += width + xPadding
  })

  // Calculate total height needed
  const totalHeight = currentY + maxHeight + yPadding

  // Generate SVG
  let response = `
    <svg
      width="${overallWidth}"
      height="${totalHeight}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
  `

  images.forEach((image) => {
    response += `
      <a xlink:href="${image.url}" target="_blank">
        <image 
          href="${imgToBase64(image.path)}" 
          x="${image.x}" 
          y="${image.y}" 
          height="${image.height}" 
          width="${image.width}"
        />
      </a>
    `
  })

  response += `</svg>`
  return response
}

function imgToBase64(filePath) {
  let extname = path.extname(filePath).slice(1) || 'png'
  if (extname === 'svg') {
    extname = "svg+xml"
  }
  return 'data:image/' + extname + ';base64,' + fs.readFileSync(filePath).toString('base64')
}

const getScaledImageDimensions = (width, height, isLeadSponsor = false) => {
  const ratio = width / height
  const maxH = isLeadSponsor ? leadSponsorHeight : maxHeight
  const maxW = isLeadSponsor ? leadSponsorMaxWidth : maxWidth

  let h = maxH
  let w = (maxH / height) * width

  if (w > maxW) {
    w = maxW
    h = (maxW / width) * height
  }

  return [w, h]
}

export async function GET({ params, request }) {
  return new Response(buildResponse())
}