import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/dist/photoswipe.css"

function initPhotoSwipe() {
  const prose = document.querySelector(".prose")
  if (prose) {
    prose.querySelectorAll("img:not(a img):not(picture img)").forEach((img) => {
      const width = img.naturalWidth || +img.getAttribute("width") || 1200
      const height = img.naturalHeight || +img.getAttribute("height") || 800
      const a = document.createElement("a")
      a.href = img.src
      a.className = "cursor-zoom-in"
      a.dataset.pswpSrc = img.src
      a.dataset.pswpWidth = String(width)
      a.dataset.pswpHeight = String(height)
      img.replaceWith(a)
      a.appendChild(img)
    })
  }

  const galleries = document.querySelectorAll(".pswp-feature, .prose")
  if (![...galleries].some((g) => g.querySelector("a[data-pswp-src]"))) return

  new PhotoSwipeLightbox({
    gallery: galleries,
    children: "a[data-pswp-src]",
    pswpModule: () => import("photoswipe"),
  }).init()
}

initPhotoSwipe()
