import featuredSponsors from "../../featured-sponsors.json"
import fs from "fs"
import path from "path"
import sizeOf from "image-size"

const baseUrl = import.meta.env.SITE

// Width of the composed SVG
const overallWidth = 814
// Maximum height a logo may have
const maxHeight = 50
// Lead sponsor height (doubled from regular sponsors)
const leadSponsorHeight = maxHeight * 2
// Maximum width a logo may have
const maxWidth = 200
// Lead sponsor maximum width (doubled from regular sponsors)
const leadSponsorMaxWidth = maxWidth * 2
// Horizontal padding between logos
const xPadding = 40
// Vertical padding between rows of logos
const yPadding = 20
// Additional padding below lead sponsors
const leadSponsorBottomPadding = 80

const buildResponse = () => {
  let images = []
  let currentY = 30

  // First process lead sponsors
  const leadSponsors = featuredSponsors.filter(sponsor => sponsor.isLeading === true)
  const regularSponsors = featuredSponsors.filter(sponsor => sponsor.isLeading !== true)

  console.log("Processing lead sponsors")

  // Handle lead sponsors (centered, own row)
  if (leadSponsors.length > 0) {
    // Get dimensions for lead sponsors
    const leadSponsorInfo = leadSponsors.map(sponsor => {
      // Ensure we have a valid logo path
      const logoPath = sponsor.logo ? `./public${sponsor.logo}` : null
      if (!logoPath) {
        console.error(`Missing logo path for sponsor: ${sponsor.name}`)
        return null
      }

      try {
        const dimensions = sizeOf(logoPath)
        const [width, height] = getScaledImageDimensions(
            dimensions.width,
            dimensions.height,
            true
        )
        return { sponsor, width, height, logoPath }
      } catch (error) {
        console.error(`Error processing logo for ${sponsor.name}:`, error)
        return null
      }
    }).filter(Boolean) // Remove any null entries

    // Calculate total width including padding between lead sponsors
    const totalLeadWidth = leadSponsorInfo.reduce((sum, info, index) => {
      return sum + info.width + (index < leadSponsors.length - 1 ? xPadding : 0)
    }, 0)

    // Center the lead sponsors
    let startX = (overallWidth - totalLeadWidth) / 2

    // Place lead sponsors
    leadSponsorInfo.forEach(({ sponsor, width, height, logoPath }) => {
      images.push({
        href: baseUrl + sponsor.logo,
        path: logoPath,
        x: startX,
        y: currentY + (leadSponsorHeight - height) / 2,
        height,
        width,
        url: sponsor.url,
        isLead: true
      })

      startX += width + xPadding
    })

    currentY += leadSponsorHeight + leadSponsorBottomPadding
  }

  // Now process regular sponsors
  let currentX = 0
  regularSponsors.forEach((sponsor) => {
    // Ensure we have a valid logo path
    const logoPath = sponsor.logo ? `./public${sponsor.logo}` : null
    if (!logoPath) {
      console.error(`Missing logo path for sponsor: ${sponsor.name}`)
      return
    }

    try {
      const dimensions = sizeOf(logoPath)
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
        href: baseUrl + sponsor.logo,
        path: logoPath,
        x: currentX,
        y: currentY + (maxHeight - height) / 2,
        height,
        width,
        url: sponsor.url,
        isLead: false
      })

      currentX += width + xPadding
    } catch (error) {
      console.error(`Error processing logo for ${sponsor.name}:`, error)
    }
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