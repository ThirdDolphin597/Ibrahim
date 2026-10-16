from html.parser import HTMLParser
from pathlib import Path
import unittest

from app import app, photography_albums, photography_sections


class PageParser(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.images = []
        self.scripts = []
        self.links = []
        self.main_text = []
        self.in_main = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.in_main = True
        if tag == 'img':
            self.images.append(attrs)
        elif tag == 'script' and 'src' in attrs:
            self.scripts.append(attrs['src'])
        elif tag == 'a':
            self.links.append(attrs)

    def handle_endtag(self, tag):
        if tag == 'main':
            self.in_main = False

    def handle_data(self, data):
        if self.in_main and data.strip():
            self.main_text.append(data.strip())


class PhotographyTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_overview_uses_only_cover_preview(self):
        response = self.client.get('/photography')
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        page = PageParser(html)
        for slug in photography_albums:
            self.assertTrue(any(link['href'] == f'/photography/{slug}' for link in page.links))
        self.assertEqual(len(page.images), 2)
        self.assertEqual(page.images[1]['src'],
                         '/static/images/photography/controllers/controller-07-640.webp')
        self.assertIn('controller-07-320.webp', page.images[1]['srcset'])
        self.assertIn('-640.webp', page.images[0]['src'])
        self.assertIn('srcset', page.images[0])
        self.assertNotIn('-display.webp', html)
        self.assertNotIn('/static/js/photography.js', page.scripts)
        for extra in ['Under construction', 'coming soon', 'Browse by subject',
                      'The collections', 'photo-album-number', 'photo-count']:
            self.assertNotIn(extra, html)
        self.assertNotIn('photoswipe', html.lower())
        self.assertNotIn('Cormorant', html)
        self.assertEqual(' '.join(page.main_text),
                         'Photography Soccer Senior Night Rowing CAD Models / Tech Rear Shock Stand Controllers')
        headings = [f'id="section-{slug}">{title}</h2>'
                    for slug, title in photography_sections.items()]
        for heading in headings:
            self.assertIn(heading, html)
        self.assertLess(html.index(headings[0]), html.index('Senior Night</h3>'))
        self.assertLess(html.index('Senior Night</h3>'), html.index(headings[1]))
        self.assertLess(html.index(headings[2]), html.index('Rear Shock Stand</h3>'))
        self.assertLess(html.index('Rear Shock Stand</h3>'), html.index('Controllers</h3>'))

    def test_controllers_album_has_all_photos_in_order(self):
        response = self.client.get('/photography/controllers')
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        page = PageParser(html)
        photos = photography_albums['controllers']['photos']
        self.assertEqual(len(photos), 11)
        self.assertEqual(len(page.images), 11)
        self.assertEqual(' '.join(page.main_text),
                         'Back CAD Models / Tech Controllers '
                         'A collection of Xbox controllers, photographed individually and together.')
        self.assertEqual([image['loading'] for image in page.images],
                         ['eager'] + ['lazy'] * 10)
        self.assertIn('/static/js/photography.js', page.scripts)
        links = [link for link in page.links if 'data-pswp-width' in link]
        self.assertEqual(len(links), 11)
        for index, (photo, image, link) in enumerate(zip(photos, page.images, links)):
            self.assertIn(f'controller-{index + 1:02}-640.webp', image['src'])
            self.assertEqual(image['alt'], photo['alt'])
            self.assertEqual(int(image['width']), photo['width'])
            self.assertEqual(int(image['height']), photo['height'])
            self.assertEqual(link['href'], photo['display'])
            self.assertEqual(link['data-download-url'],
                             f'/photography/controllers/download/{index}')
        self.assertNotIn('figcaption', html)
        self.assertNotIn('data-caption', html)

    def test_album_reserves_dimensions_and_defers_display_images(self):
        response = self.client.get('/photography/cad-models')
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        page = PageParser(html)
        self.assertEqual(' '.join(page.main_text),
                         'Back CAD Models / Tech Rear Shock Stand '
                         'Portrait and angled views of a rear shock on its display stand.')
        back = next(link for link in page.links
                    if link.get('aria-label') == 'Back to photography')
        self.assertEqual(back['href'], '/photography')
        self.assertIn('photo-back', back['class'])
        self.assertIn('photography-album-page', html)
        self.assertIn('class="photo-section-label">CAD Models / Tech</span>', html)
        self.assertIn('class="photo-description"', html)
        self.assertIn('class="nav-center"', html)
        self.assertIn('<div class="photo-back-row">', html)
        self.assertLess(html.index('<main'), html.index('class="photo-back"'))
        self.assertLess(html.index('id="themeToggle"'), html.index('class="photo-back"'))
        previews = [image for image in page.images if 'src' in image]
        self.assertEqual(len(previews), 2)
        self.assertEqual([image['loading'] for image in previews], ['eager', 'lazy'])
        self.assertNotIn('shock-stand-front', html)
        for image in previews:
            self.assertIn('srcset', image)
            self.assertIn('sizes', image)
            self.assertGreater(int(image['width']), 0)
            self.assertGreater(int(image['height']), 0)
            self.assertNotIn('-display.webp', image['src'])
            self.assertTrue(image['alt'])
        photo_links = [link for link in page.links if 'data-pswp-width' in link]
        self.assertEqual(len(photo_links), 2)
        for link in photo_links:
            self.assertIn('-display.webp', link['href'])
            self.assertGreater(int(link['data-pswp-width']), 0)
            self.assertGreater(int(link['data-pswp-height']), 0)
        self.assertIn('/static/js/photography.js', page.scripts)
        self.assertTrue(any('masonry-layout@4.2.2' in script for script in page.scripts))
        self.assertTrue(any('photoswipe/5.3.7' in script for script in page.scripts))
        for extra in ['figcaption', 'data-caption', 'Under construction',
                      'Selected photographs', 'photo-intro', '<dialog']:
            self.assertNotIn(extra, html)

    def test_photo_assets_exist_and_meet_size_budgets(self):
        root = Path(app.static_folder)
        total = 0
        for photo in [photo for album in photography_albums.values()
                      for photo in album['photos']]:
            for url, budget in [(photo['preview'], 20000), (photo['display'], 50000)]:
                path = root / url.removeprefix('/static/')
                self.assertTrue(path.is_file())
                self.assertLess(path.stat().st_size, budget)
                with self.client.get(url) as response:
                    self.assertEqual(response.status_code, 200)
                total += path.stat().st_size
            for variant in photo['srcset'].split(','):
                with self.client.get(variant.strip().split()[0]) as response:
                    self.assertEqual(response.status_code, 200)
        self.assertLess(total, 400000)

    def test_download_returns_the_selected_image_as_an_attachment(self):
        for slug, album in photography_albums.items():
            for index, photo in enumerate(album['photos']):
                with self.client.get(f'/photography/{slug}/download/{index}') as response:
                    self.assertEqual(response.status_code, 200)
                    self.assertIn(response.mimetype, ['image/webp', 'application/octet-stream'])
                    self.assertIn('attachment;', response.headers['Content-Disposition'])
                    self.assertIn(Path(photo['display']).name,
                                  response.headers['Content-Disposition'])
                    path = Path(app.static_folder) / photo['display'].removeprefix('/static/')
                    self.assertEqual(response.data, path.read_bytes())
        for url in ['/photography/cad-models/download/2',
                    '/photography/not-an-album/download/0',
                    '/photography/senior-night/download/0',
                    '/photography/controllers/download/11']:
            self.assertEqual(self.client.get(url).status_code, 404)

    def test_empty_albums_and_unknown_album(self):
        for slug in ['senior-night']:
            response = self.client.get(f'/photography/{slug}')
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)
            page = PageParser(html)
            self.assertNotIn('coming soon', html)
            self.assertNotIn('Under construction', html)
            self.assertEqual(page.images, [])
            self.assertNotIn('/static/js/photography.js', page.scripts)
            self.assertIn('<h1>Senior Night</h1>', html)
            self.assertEqual(' '.join(page.main_text),
                             'Back Soccer Senior Night Soccer photographs from Senior Night.')
        self.assertEqual(self.client.get('/photography/not-an-album').status_code, 404)

    def test_existing_pages_keep_local_photography_links(self):
        for url in ['/', '/about', '/blog', '/blog-post?id=16']:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)
            page = PageParser(response.get_data(as_text=True))
            links = [link for link in page.links if link.get('href') == '/photography']
            self.assertEqual(len(links), 1)
            self.assertNotIn('target', links[0])


if __name__ == '__main__':
    unittest.main()
