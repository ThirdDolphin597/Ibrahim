//const blogPosts = [
    {
        id: 1,
        category: "Latest",
        date: "Sep 29, 2025",
        dateSort: new Date("2025-09-29"), // For sorting purposes
        title: "How I built my first full-stack application",
        description: "A comprehensive guide through the process of creating a complete web application from concept to deployment, including the challenges I faced and lessons learned.",
        image: "images/placeholder.webp",
        content: `
            <h2>Introduction</h2>
            <p>Building your first full-stack application is an exciting milestone in any developer's journey. In this post, I'll share my experience creating a complete web application from scratch.</p>
            <h2>The Tech Stack</h2>
            <p>For this project, I chose the following technologies:</p>
            <ul>
                <li>Frontend: React with Bootstrap</li>
                <li>Backend: Node.js with Express</li>
                <li>Database: PostgreSQL</li>
                <li>Deployment: Vercel (frontend) and Heroku (backend)</li>
            </ul>
            
            <h2>Challenges I Faced</h2>
            <p>Throughout the development process, I encountered several challenges including state management, API design, and database optimization.</p>
            
            <h2>Lessons Learned</h2>
            <p>This project taught me the importance of proper planning, testing, and documentation. I also learned to embrace debugging as a learning opportunity.</p>
            
            <h2>Conclusion</h2>
            <p>Building this application was an incredible learning experience that boosted my confidence as a developer. I encourage everyone to take on similar challenges!</p>
        `
    },
    
];

// Sort posts by date (newest first) - this ensures the newest post is always at the top
blogPosts.sort((a, b) => b.dateSort - a.dateSort);