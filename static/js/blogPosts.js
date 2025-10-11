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
    {
        id: 2,
        category: "Learning",
        date: "Sep 25, 2025",
        dateSort: new Date("2025-09-25"),
        title: "Getting started with React",
        description: "My journey learning React and building interactive user interfaces.",
        image: "images/placeholder.webp",
        content: `
            <h2>Why React?</h2>
            <p>React has become one of the most popular JavaScript libraries for building user interfaces. Here's why I decided to learn it.</p>
            
            <h2>Key Concepts</h2>
            <p>Understanding components, props, state, and hooks is essential for working with React effectively.</p>
            
            <h2>My First React Project</h2>
            <p>I started with a simple to-do list application to understand the basics of React development.</p>
        `
    },
    {
        id: 3,
        category: "Tutorial",
        date: "Sep 20, 2025",
        dateSort: new Date("2025-09-20"),
        title: "Setting up a development environment",
        description: "Essential tools and configurations for productive web development.",
        image: "images/placeholder.webp",
        content: `
            <h2>Essential Tools</h2>
            <p>A well-configured development environment can significantly boost your productivity.</p>
            
            <h2>Text Editor Setup</h2>
            <p>VS Code is my editor of choice, with extensions like Prettier, ESLint, and GitLens.</p>
            
            <h2>Terminal Configuration</h2>
            <p>Customizing your terminal with tools like Oh My Zsh can make command-line work more efficient.</p>
        `
    },
    {
        id: 4,
        category: "Experience",
        date: "Sep 15, 2025",
        dateSort: new Date("2025-09-15"),
        title: "My first hackathon",
        description: "Participating in my first hackathon and what I learned from the experience.",
        image: "images/placeholder.webp",
        content: `
            <h2>The Event</h2>
            <p>My first hackathon was a 24-hour coding marathon that pushed me to my limits.</p>
            
            <h2>The Team</h2>
            <p>Working with talented developers from different backgrounds was an incredible experience.</p>
            
            <h2>What We Built</h2>
            <p>Our team created a web application that helps students find study partners based on their courses and learning styles.</p>
            
            <h2>Key Takeaways</h2>
            <p>Time management, teamwork, and quick decision-making are crucial skills for hackathon success.</p>
        `
    }
];

// Sort posts by date (newest first) - this ensures the newest post is always at the top
blogPosts.sort((a, b) => b.dateSort - a.dateSort);