# Blog Post Template

Use this template when creating new blog posts for your website.

## Instructions

1. Copy the entire JavaScript object below
2. Open `blogPosts.js`
3. Paste it at the **TOP** of the `blogPosts` array (before the existing posts)
4. Update all the fields with your blog post information
5. Make sure to increment the `id` to be unique
6. Set the `dateSort` correctly - the posts will automatically sort with newest first!

---

## Template to Copy

```javascript
{
    id: 5, // ⚠️ CHANGE THIS - Must be unique! Increment from the last post
    category: "Tutorial", // Options: "Tutorial", "Learning", "Experience", "Latest", etc.
    date: "Oct 1, 2025", // Display date (human readable format)
    dateSort: new Date("2025-10-01"), // ⚠️ IMPORTANT - Used for sorting (format: YYYY-MM-DD)
    title: "Your Blog Post Title Here",
    description: "A brief description of your blog post that will appear on the blog listing page. Keep it concise and engaging!",
    image: "/static/images/placeholder.webp", // Path to your blog post image
    content: `
        <h2>Introduction</h2>
        <p>Start your blog post with an engaging introduction. Explain what the reader will learn or why this topic is important.</p>
        
        <h2>Main Section Heading</h2>
        <p>Add your main content here. You can use multiple paragraphs to organize your thoughts.</p>
        
        <p>Additional paragraph with more details about your topic.</p>
        
        <h2>Another Section</h2>
        <p>Here's how you can add lists to your content:</p>
        <ul>
            <li>First point or item</li>
            <li>Second point or item</li>
            <li>Third point or item</li>
        </ul>
        
        <h2>Key Takeaways</h2>
        <p>You can add bullet points for key information:</p>
        <ul>
            <li>Important point one</li>
            <li>Important point two</li>
            <li>Important point three</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Wrap up your blog post with key takeaways or final thoughts. Encourage readers to try what they've learned!</p>
    `
}
```

---

## Quick Reference

### Required Fields
- **id**: Unique number (increment from last post)
- **category**: Category tag for the post
- **date**: Display date (e.g., "Oct 1, 2025")
- **dateSort**: JavaScript Date object for sorting (e.g., `new Date("2025-10-01")`)
- **title**: Your blog post title
- **description**: Brief summary (keep under 200 characters)
- **image**: Path to featured image
- **content**: Full HTML content of the post

### Available HTML Tags for Content

```html
<h2>Main Heading</h2>
<h3>Sub-heading</h3>
<p>Paragraph text</p>
<strong>Bold text</strong>
<em>Italic text</em>
<ul><li>Unordered list item</li></ul>
<ol><li>Numbered list item</li></ol>
<a href="url">Link text</a>
<blockquote>Quote text</blockquote>
```

### Category Suggestions
- Tutorial
- Learning
- Experience
- Latest
- Technology
- Project
- Tips & Tricks

### Image Recommendations
- Recommended size: 1200x600px (2:1 aspect ratio)
- Format: .webp, .jpg, or .png
- Place images in: `/static/images/blog/`

---

## Example Workflow

1. **Copy** the template object from above
2. **Open** `blogPosts.js` in your editor
3. **Paste** at the TOP of the `blogPosts` array:
   ```javascript
   const blogPosts = [
       // PASTE YOUR NEW POST HERE (before existing posts)
       {
           id: 5,
           category: "Tutorial",
           // ... rest of template
       },
       // Existing posts follow...
   ```
4. **Update** all fields with your content
5. **Save** the file
6. **Refresh** your blog page - the new post will appear at the top!

---

## Notes

- Posts automatically sort by `dateSort` (newest first)
- The newest post will always be featured at the top in a larger card
- Don't forget to add a comma after your new post object!
- You can add your own images to `/static/images/blog/` folder
- The `content` field supports HTML, so you can format it however you like

---

## Need Help?

- Make sure each post has a unique `id`
- Ensure `dateSort` is in the correct format: `new Date("YYYY-MM-DD")`
- Check that all strings are properly quoted
- Don't forget commas between fields and between post objects
