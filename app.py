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
                'preview': '/static/images/photography/cad-models/shock-stand-portrait-640.webp',
                'srcset': '/static/images/photography/cad-models/shock-stand-portrait-320.webp 320w, /static/images/photography/cad-models/shock-stand-portrait-640.webp 640w',
                'display': '/static/images/photography/cad-models/shock-stand-portrait-display.webp',
                'alt': 'Portrait view of a rear shock on a white display stand.',
                'width': 768,
                'height': 1152
            },
            {
                'preview': '/static/images/photography/cad-models/shock-stand-angle-640.webp',
                'srcset': '/static/images/photography/cad-models/shock-stand-angle-320.webp 320w, /static/images/photography/cad-models/shock-stand-angle-640.webp 640w',
                'display': '/static/images/photography/cad-models/shock-stand-angle-display.webp',
                'alt': 'Angled view of the rear shock and white display stand.',
                'width': 1152,
                'height': 768
            }
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
