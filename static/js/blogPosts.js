const blogPosts = [
    {
        id: 3,
        category: "Project",
        date: "Jan 22, 2026",
        dateSort: new Date("2026-01-22"),
        title: "LED Lightbox Project: Cleaning Up the Code",
        description: "Recent developments and improvements made to the project.",
        image: "images/blog/code.png",
        contentFile: "blog/post-3.html"
    },
    {
        id: 2,
        category: "Robotics",
        date: "Jan 15, 2026",
        dateSort: new Date("2026-01-15"),
        title: "LED Lightbox Project: Remaking the PCB",
        description: "Challenges faced and solutions implemented while remaking the PCB for the LED lightbox project.",
        image: "images/blog/solder.jpg",
        contentFile: "blog/post-2.html"
    },
    {
        id: 1,
        category: "Robotics",
        date: "Jan 8, 2026",
        dateSort: new Date("2026-01-08"),
        title: "LED Lightbox Project: PCB Design and Milling",
        description: "A journey through designing and milling a custom PCB for an embedded electronics project, including prototyping on breadboard, schematic design, and the manufacturing process.",
        image: "images/blog/milll.jpg",
        contentFile: "blog/post-1.html"
    }
];

// Sort posts by date (newest first) - this ensures the newest post is always at the top
blogPosts.sort((a, b) => b.dateSort - a.dateSort);