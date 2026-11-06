from flask import Flask, abort, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

photography_sections = {
    'boston': 'Boston',
    'soccer': 'Soccer',
    'rowing': 'Rowing',
    'tech': 'CAD Models / Tech'
}

photography_albums = {
    'boston': {
        'title': 'Boston',
        'cover_index': 5,
        'description': 'Autumn along the Charles River, Boston, and Cambridge.',
        'section': 'boston',
        'photos': [
            {
                'preview': f'/static/images/photography/boston/{filename}-640.jpg',
                'srcset': (
                    f'/static/images/photography/boston/{filename}-320.jpg 320w, '
                    f'/static/images/photography/boston/{filename}-640.jpg 640w'
                ),
                'display': f'/static/images/photography/boston/{filename}.jpg',
                'alt': alt,
                'width': width,
                'height': height
            }
            for filename, width, height, alt in [
                ('IMG_9475', 1152, 768, 'Arched bridge and autumn trees reflected in the Charles River.'),
                ('IMG_9480', 1152, 768, 'Riverside towers and a yellow school bus above autumn foliage.'),
                ('IMG_9491', 768, 1152, 'Railroad tracks covered in fallen leaves beneath yellow trees.'),
                ('IMG_9496', 1152, 768, 'Stacked angular tower across the river behind autumn trees.'),
                ('IMG_9498', 1152, 768, 'Close view of a stacked angular tower above red autumn foliage.'),
                ('IMG_9499', 768, 1152, 'Portrait view of the river and angular tower beneath a cloudy sky.'),
                ('IMG_9502', 1152, 768, 'Angular tower across the river framed by golden leaves.'),
                ('IMG_9505', 1152, 768, 'Waterbird on the river with autumn trees and an angular tower beyond.'),
                ('IMG_9508', 1152, 768, 'Boston skyline and Citgo sign across the Charles River in autumn.'),
                ('IMG_9517', 1152, 768, 'Citgo sign framed by red leaves and golden riverside plants.'),
                ('IMG_9519', 1152, 768, 'Close view of the Citgo sign beyond soft golden plants.'),
                ('IMG_9520', 1152, 768, 'Golden seed heads in focus with the Citgo sign blurred behind.'),
                ('IMG_9434', 1152, 768, 'Riverside campus tower above autumn trees beneath a cloudy sky.'),
                ('IMG_9436', 1152, 768, 'Red brick riverside building and autumn trees reflected in the water.'),
                ('IMG_9438', 1152, 768, 'Wide view of a red brick building and colorful trees beside the river.'),
                ('IMG_9447', 1151, 768, 'Vintage Shell sign framed by autumn trees.'),
                ('IMG_9543', 768, 1152, 'Prudential Tower and Boston skyline across the Charles River.'),
                ('IMG_9550', 1152, 768, 'Boston skyline across the river with red berries in the foreground.'),
                ('IMG_9572', 1152, 768, 'Wide view of the Boston skyline across the Charles River.'),
                ('IMG_9582', 1152, 768, 'Seagull flying beneath white clouds in a blue sky.'),
                ('IMG_9615', 768, 1152, 'Prudential Tower across the river framed by red autumn leaves.'),
                ('IMG_9617', 1152, 768, 'Harvard Bridge stretching across the river toward the Boston skyline.'),
                ('IMG_9627', 1152, 768, 'Boston towers and autumn shoreline reflected in the Charles River.'),
                ('IMG_9644', 1152, 768, 'MIT Great Dome and columns framed by autumn trees.'),
                ('IMG_9654', 768, 1152, 'Tall campus building above orange and red autumn foliage.'),
                ('IMG_9659', 768, 1152, 'Outdoor clock surrounded by orange autumn trees.'),
                ('IMG_9661', 768, 1152, 'Close view of an outdoor clock against autumn leaves.'),
                ('IMG_9662', 1152, 768, 'Glass campus towers reflecting warm light above autumn trees.'),
                ('IMG_9665', 768, 1152, 'Portrait view of a glass tower reflecting orange light.'),
                ('IMG_9684', 768, 1152, 'Geometric facade of a tall campus building against the sky.'),
                ('IMG_9715', 1152, 768, 'Black camera backpack on a stone bench in a city plaza.'),
                ('IMG_9718', 768, 1152, 'Brick clock tower beside an MIT Museum banner.'),
                ('IMG_9722', 1152, 768, 'Brick clock tower beneath a modern glass building.'),
                ('IMG_9734', 768, 1152, 'Curving riverside road beneath the Boston skyline and cloudy sky.'),
                ('IMG_9756', 1151, 768, 'Three swans flying together across a blue-gray sky.'),
                ('IMG_9780', 768, 1152, 'Stone tower and decorative masonry on the Longfellow Bridge.'),
                ('IMG_9789', 1152, 768, 'Cambridge waterfront and autumn trees viewed from the bridge.'),
                ('IMG_9790', 768, 1152, 'Sunlit walkway and ornamental lamps along the Longfellow Bridge.'),
                ('IMG_9801', 768, 1152, 'Golden rooftop statue against a modern glass building.'),
                ('IMG_9803', 1152, 768, 'Longfellow Bridge arches and stone towers across the Charles River.'),
                ('IMG_9810', 1152, 768, 'Train crossing the Longfellow Bridge above the river.'),
                ('IMG_9830', 1152, 768, 'Cambridge buildings and autumn waterfront park across the river.'),
                ('IMG_9834', 1152, 768, 'Zakim Bridge cables framed by a brilliant red autumn tree.'),
                ('IMG_9843', 1152, 768, 'Glass Verizon tower with projecting terraces beneath a cloudy sky.'),
                ('IMG_9859', 768, 1152, 'State Street glass tower framed by brick buildings along a city street.'),
                ('IMG_9877', 1152, 768, 'Bruins bear statue outside TD Garden with the Zakim Bridge behind.'),
                ('IMG_9887', 1152, 768, 'Zakim Bridge tower and sweeping cables beneath gray clouds.'),
                ('IMG_9891', 768, 1152, 'Verizon tower above the TD Garden entrance.'),
                ('IMG_9893', 1152, 768, 'Converse sign atop a brick waterfront building.'),
                ('IMG_9908', 1152, 768, 'Illuminated signs and glass atrium at the TD Garden entrance.')
            ]
        ]
    },
    'senior-night': {
        'title': 'Senior Night',
        'description': 'Soccer photographs from Senior Night.',
        'section': 'soccer',
        'photos': []
    },
    'cad-models': {
        'title': 'Rear Shock Stand',
        'description': 'Portrait and angled views of a rear shock on its display stand.',
        'section': 'tech',
        'photos': [
            {
                'preview': '/static/images/photography/cad-models/shock-stand-portrait-640.png',
                'srcset': '/static/images/photography/cad-models/shock-stand-portrait-320.png 320w, /static/images/photography/cad-models/shock-stand-portrait-640.png 640w',
                'display': '/static/images/photography/cad-models/shock-stand-portrait-display.png',
                'alt': 'Portrait view of a rear shock on a white display stand.',
                'width': 768,
                'height': 1152
            },
            {
                'preview': '/static/images/photography/cad-models/shock-stand-angle-640.png',
                'srcset': '/static/images/photography/cad-models/shock-stand-angle-320.png 320w, /static/images/photography/cad-models/shock-stand-angle-640.png 640w',
                'display': '/static/images/photography/cad-models/shock-stand-angle-display.png',
                'alt': 'Angled view of the rear shock and white display stand.',
                'width': 1152,
                'height': 768
            }
        ]
    },
    'controllers': {
        'title': 'Controllers',
        'cover_index': 6,
        'description': 'A collection of Xbox controllers, photographed individually and together.',
        'section': 'tech',
        'photos': [
            {
                'preview': f'/static/images/photography/controllers/controller-{index:02}-640.png',
                'srcset': (
                    f'/static/images/photography/controllers/controller-{index:02}-320.png 320w, '
                    f'/static/images/photography/controllers/controller-{index:02}-640.png 640w'
                ),
                'display': f'/static/images/photography/controllers/controller-{index:02}-display.png',
                'alt': alt,
                'width': width,
                'height': height
            }
            for index, (width, height, alt) in enumerate([
                (1368, 768, 'Low rear view of a white and black Xbox controller.'),
                (1368, 768, 'Low rear view of a blue and white Xbox controller.'),
                (768, 1368, 'Black Xbox controller in front of a headset.'),
                (768, 1368, 'Blue Xbox controller leaning against a camera lens.'),
                (768, 1368, 'White Xbox controller leaning against a white console.'),
                (768, 1368, 'Close-up of a white and black Xbox controller with a silver directional pad.'),
                (768, 1368, 'Blue Xbox controller leaning against a white console.'),
                (768, 1368, 'Portrait view of Xbox controllers lined up with a white and black controller in front.'),
                (1368, 768, 'Landscape view of Xbox controllers lined up beside a white console.'),
                (1368, 768, 'Low rear view along a row of Xbox controllers.'),
                (768, 768, 'Xbox controllers arranged on a table with a blue controller in the foreground.')
            ], start=1)
        ]
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/blog-post')
def blog_post():
    return render_template('blog-post.html')

@app.route('/photography')
def photography():
    return render_template('photography.html', sections=photography_sections,
                           albums=photography_albums, album=None)

@app.route('/photography/<album_slug>')
def photography_album(album_slug):
    album = photography_albums.get(album_slug)
    if album is None:
        abort(404)
    return render_template('photography.html', sections=photography_sections,
                           album=album, album_slug=album_slug)

@app.route('/photography/<album_slug>/download/<int:photo_index>')
def photography_download(album_slug, photo_index):
    album = photography_albums.get(album_slug)
    if album is None or photo_index >= len(album['photos']):
        abort(404)
    image_url = album['photos'][photo_index]['display']
    if not image_url.startswith('/static/'):
        abort(404, description='This photograph is not available as a local download.')
    return send_from_directory(app.static_folder, image_url.removeprefix('/static/'),
                               as_attachment=True)

@app.route('/timeline')
def timeline():
    return render_template('timeline.html')

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
