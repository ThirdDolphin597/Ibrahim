const blogPosts = [
    {
        id: 6,
        category: "Project",
        date: "Mar 5, 2026",
        dateSort: new Date("2026-03-05"),
        title: "LED Lightbox Project: Finalizing the 3D Model",
        description: "Finalizing the enclosure design, perfecting the internal layout, and preparing the model for 3D printing.",
        image: "images/blog/Lightbox3.png",
        contentFile: "blog/post-6.html"
    },
    {
        id: 5,
        category: "Project",
        date: "Feb 5, 2026",
        dateSort: new Date("2026-02-05"),
        title: "LED Lightbox: Creating the Box and Finalizing the PCB",
        description: "Finalizing the physical design, testing the complete system, and preparing for final installation.",
        image: "images/blog/newpcb.png",
        contentFile: "blog/post-5.html"
    },
    {
        id: 4,
        category: "Project",
        date: "Jan 29, 2026",
        dateSort: new Date("2026-01-29"),
        title: "LED Lightbox Project: Final Code & Hall Effect Sensor Integration",
        description: "Integrating a hall effect sensor to replace the mechanical button with a contactless activation method.",
        image: "images/blog/examplecode.png",
        contentFile: "blog/post-4.html"
    },
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
        category: "Project",
        date: "Jan 15, 2026",
        dateSort: new Date("2026-01-15"),
        title: "LED Lightbox Project: Remaking the PCB",
        description: "Challenges faced and solutions implemented while remaking the PCB for the LED lightbox project.",
        image: "images/blog/solder.jpg",
        contentFile: "blog/post-2.html"
    },
    {
        id: 1,
        category: "Project",
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