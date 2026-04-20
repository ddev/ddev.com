import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/dist/photoswipe.css"

async function initPhotoSwipe() {
  const prose = document.querySelector(".prose")
  if (!prose) return

  const imgs = [...prose.querySelectorAll("img")].filter(
    (img) => !img.closest("a") && !img.closest("picture")
  )
  if (!imgs.length) return

  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((r) => {
            img.onload = img.onerror = () => r()
          })
    )
  )

  imgs.forEach((img) => {
    const a = document.createElement("a")
    a.href = img.src
    a.dataset.pswpSrc = img.src
    a.dataset.pswpWidth = String(img.naturalWidth || 1200)
    a.dataset.pswpHeight = String(img.naturalHeight || 800)
    img.parentNode.insertBefore(a, img)
    a.appendChild(img)
  })

  const lightbox = new PhotoSwipeLightbox({
    gallery: ".prose",
    children: "a[data-pswp-src]",
    pswpModule: () => import("photoswipe"),
  })
  lightbox.init()
}

initPhotoSwipe()
