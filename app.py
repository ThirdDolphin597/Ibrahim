from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
