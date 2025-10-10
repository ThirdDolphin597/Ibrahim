function renderBlogPosts() {
    console.log('Rendering blog posts...');
    const blogContainer = document.querySelector('.blog-container');
    if (!blogContainer) {
        console.error('Blog container not found!');
        return;
    }
    console.log('Found blog container:', blogContainer);
    
    // Clear existing content
    blogContainer.innerHTML = '';
    
    // Posts are already sorted by date (newest first) in blogPosts.js
    // Create featured post (latest/newest post - index 0)
    const featuredPost = blogPosts[0];
    const featuredHTML = `
        <div class="col-12 mb-4">
            <a href="/blog-post?id=${featuredPost.id}" class="text-decoration-none">
                <div class="card h-100 border-0 shadow-sm blog-card-custom blog-card-clickable">
                    <div class="blog-image-container">
                        <img src="/static/${featuredPost.image}" alt="${featuredPost.title}" class="blog-image">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <small class="text-muted mb-2">${featuredPost.category} • ${featuredPost.date}</small>
                        <h2 class="card-title h3 mb-3">${featuredPost.title}</h2>
                        <p class="card-text text-muted">${featuredPost.description}</p>
                        <div class="mt-auto">
                            <span class="text-primary">Read more →</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
    
    // Create regular posts (remaining posts in descending date order)
    const regularPosts = blogPosts.slice(1).map(post => `
        <div class="col-lg-4 col-md-6">
            <a href="/blog-post?id=${post.id}" class="text-decoration-none">
                <div class="card h-100 border-0 shadow-sm blog-card-custom blog-card-clickable">
                    <div class="blog-image-container">
                        <img src="/static/${post.image}" alt="${post.title}" class="blog-image">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <small class="text-muted mb-2">${post.category} • ${post.date}</small>
                        <h3 class="card-title h5 mb-3">${post.title}</h3>
                        <p class="card-text text-muted">${post.description}</p>
                        <div class="mt-auto">
                            <span class="text-primary">Read more →</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
    
    // Add all posts to the container
    blogContainer.innerHTML = featuredHTML + regularPosts;
}