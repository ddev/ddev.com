# ddev.com

[Go Back](./README.md)

## How to Add a New Featured Sponsor

1. Open the [`src/featured-sponsors.json`](./src/featured-sponsors.json) file in the repository.
2. Get the sponsor's logo files and place them in the `public/logos/` directory.

   I usually search for the organization's brand assets on their website by inspecting the page source in the browser and looking for `.svg` or `.png` files. If I cannot find them there, I search Google Images.

   It is preferable to use SVG files for logos, as they scale better and look sharper on different screen sizes and resolutions. If SVGs are not available, high-resolution PNGs can be used as a fallback.

   If a PNG has high enough resolution, it can be converted to SVG using [online tools](https://convertio.co/png-svg/). After conversion, it is a good idea to manually adjust the SVG colors by editing the file directly and using a color picker to extract colors from the original PNG.

   Dark variants for logos:
   - If this is an SVG logo, you can upload it to AI and ask it to create a dark mode variant.
   - If it is a PNG, you can try adjusting the colors manually using [online tools](https://onlinepngtools.com/change-png-color) to create a dark mode version. Ask AI to help with reverse color selection if needed.

   Square logos: if the logo is already square, reuse it. If a separate square version is available, use that. Otherwise, crop the original logo to a square aspect ratio. If this is an SVG, ask AI to do it. We don't care about dark mode for square logos.

3. Add a new JSON object to the array with the following structure (we do not care much about the order; the important thing is that the result looks good):

   ```json
   {
     "name": "Upsun",
     "type": "major",
     "logo": "/logos/upsun.svg",
     "darklogo": "/logos/upsun-darkmode.svg",
     "squareLogo": "/logos/upsun-square.svg",
     "url": "https://upsun.com",
     "github": "upsun"
   }
   ```

   - **`name`** – the human-friendly organization name. (Be sure this is formatted exactly as it’s used on the website or GitHub profile!)
   - **`type`** – can be `"major"` or `"standard"` depending on contribution level. (Not currently used but can affect styling later.)
   - **`logo`** – absolute, webroot-relative path for a logo you’ve added to the `public/logos/` directory. Make sure this is a clean, optimized vector SVG file unless it’s a person’s headshot. (Again, follow the organization’s brand guide wherever possible!)
   - **`darklogo`** – absolute, webroot-relative path for a logo you’ve added to the `public/logos/` directory. This should be a version of the logo that looks good on dark backgrounds. If the original logo is already suitable for dark mode, reuse it.
   - **`squareLogo`** – a square variant of the organization’s logo, to be used in places like the [Support DDEV](https://ddev.com/support-ddev/) layout. No need to add this if `logo` is already square.
   - **`url`** – organization’s website URL.
   - **`github`** – optional GitHub username when relevant, which can be used to make sure the sponsor doesn’t appear twice in a list—as seen in the [Sponsors.astro](https://github.com/ddev/ddev.com/blob/main/src/components/Sponsors.astro#L53) component.

4. Try it locally and check both light and dark mode (there is no manual switch; change your OS or browser appearance settings):
   - `ddev launch :4321`
   - `ddev launch :4321/support-ddev/`

5. Create a pull request with your changes and add screenshots to make review easier.
