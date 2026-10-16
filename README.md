# Ibrahim
code for https://ibrahimazeemi.com/

## Photography

The Photography navigation link opens `/photography` on this site, in the
same tab. The overview has Soccer, Rowing, and CAD Models / Tech section
headings. Soccer contains Senior Night at `/photography/senior-night`;
CAD Models / Tech contains Rear Shock Stand at `/photography/cad-models`.
Rowing is ready for future albums.
Sections are defined in `photography_sections` and album metadata in
`photography_albums` in `app.py`. Each album's `section` selects its group.
The overview and album pages share `templates/photography.html`, with scoped
styling in `static/css/photography.css`. Soccer and Rowing have their own
color palettes. The overview shows album names only. Album pages use a
left-aligned category label, title, and short italic `description` from the
album metadata, all in the site's Inter font. The regular site header stays
visible, with an outlined Back link to `/photography` left-aligned above the album title.
Photographs have no captions or construction notices.
Alt text remains available for accessibility.

Add photos to an album's `photos` list with `preview`, `display`, `alt`,
`width`, and `height` fields. URLs may point to local static assets or a CDN.
Use the same aspect ratio for both image sizes. An optional `srcset` string
can provide responsive preview variants.

Export compressed WebP, AVIF, or JPEG derivatives before uploading: roughly
400-800 pixels wide for previews and 1600-2400 pixels on the long edge for
the viewer. Keep camera originals out of the deployment. The overview only
loads album covers; album grids use previews with reserved dimensions and
lazy loading after the first photo. Display images load when the viewer
opens; PhotoSwipe may then preload adjacent photographs for smooth navigation.
The gallery uses Masonry 4.2.2 and imagesLoaded 5.0.0 for the same shortest-column
layout as the reference, and PhotoSwipe 5.3.7 for zoom, swipe, keyboard navigation,
and animated opening/closing. These version-pinned libraries are loaded from
public CDNs only for populated albums, never the overview or empty albums.
Gallery-tool failures are shown explicitly; image links remain usable without
JavaScript. PhotoSwipe displays loading errors for unavailable images.
The viewer toolbar includes a download link for the currently selected display
image. Local downloads use `/photography/<album>/download/<index>` with an
attachment response so the browser saves the file rather than navigating to it.
Images initially fit the available viewer area without cropping, including
upscaling smaller photos; this does not add detail to the source image.
Zoom remains available for images smaller than the viewing area.

The initial CAD Models collection contains two shock-stand photographs:
the portrait and angled views.
Optimized WebP copies live in `static/images/photography/cad-models`:
320- and 640-pixel previews plus display versions capped at the source
resolution. Shared source attachments are not modified or deployed.

Run the photography regression checks with `python -m unittest discover -s tests`.

## Adding a blog post

Add the article as an HTML fragment in `static/blog/post-<id>.html`, then add
its metadata to `static/js/blogPosts.js` with a unique ID and the matching
`contentFile`. Image paths in metadata are relative to `static`.
Posts are sorted newest first using `dateSort`; the newest post is featured
automatically on `/blog`. Individual posts use `/blog-post?id=<id>`.
