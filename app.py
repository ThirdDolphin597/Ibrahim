from flask import Flask, abort, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

photography_sections = {
    'soccer': 'Soccer',
    'rowing': 'Rowing',
    'tech': 'CAD Models / Tech'
}

photography_albums = {
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
