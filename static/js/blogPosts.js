const blogPosts = [
    {
        id: 2,
        category: "Robotics",
        date: "Jan 8, 2026",
        dateSort: new Date("2026-01-08"),
        title: "LED Lightbox Project: PCB Design and Milling",
        description: "A journey through designing and milling a custom PCB for an embedded electronics project, including prototyping on breadboard, schematic design, and the manufacturing process.",
        image: "images/blog/milll.jpg",
        content: `
            <h2>Introduction</h2>
            <p>This week in robotics, I made significant progress on my LED lightbox project.In this post, I'll walk you through my process of taking my project from a breadboard prototype to PCB design and manufacturing.</p>
            
            <h2>The Lightbox Project</h2>
            <p>This PCB is part of a mandatory lightbox project for all sophomores in my robotics class. The project teaches us PCB design, manufacturing, electronics assembly, and embedded programming all at once. The concept is simple: create a box with laser-engraved acrylic on top, illuminated by an LED light strip controlled by a custom PCB.</p>
            <img src="/static/images/blog/example.webp" alt="Example lightbox project" style="max-width: 100%; height: auto; margin: 20px 0;">
            <p style="text-align: center; font-size: 0.9em; color: #666; margin-top: -10px; margin-bottom: 20px;"><em>Example lightbox project - Credit: Noah Lewkowitz</em></p>
            
            <h2>Prototyping on a Breadboard</h2>
            <p>My circuit began with a breadboard prototype. This allowed me to test my circuit design quickly without committing to a permanent solution, as well as troubleshoot any problems. For my project, I used an ATMEGA32 microcontroller to control an LED light strip. I power the circuit through USB-C and use a toggle switch to control power to the LED light strip.</p>
            <img src="/static/images/blog/breadbord.webp" alt="Breadboard prototype" style="max-width: 100%; height: auto; margin: 20px 0;">
            <p style="text-align: center; font-size: 0.9em; color: #666; margin-top: -10px; margin-bottom: 20px;"><em>Prototype breadboard</em></p>
            <p>The breadboard stage was crucial for debugging my circuit and ensuring all components work together as expected. I ran into some challenges with the programming cables not working correctly. Once I procured a working cable, I tested my code, a few simple lines controlling the color of the leds. With everything functioning correctly, it was time to design the PCB.</p>
            
            <h2>PCB Design Process</h2>
            <p>Transitioning from breadboard to PCB was a fun process. I used Fusion 360 to create a schematic and layout for the components I would be using. One of the challenges was that I had to model the ATMEGA32 myself and create its schematics. While I found some parts from online Fusion libraries, I had to model and create schematics for the USB-C power board and the LED light strip from scratch.</p>
            <div style="display: flex; gap: 10px; margin: 20px 0; justify-content: center;">
                <img src="/static/images/blog/path.webp" alt="PCB traces and routing" style="max-width: 40%; height: auto;">
                <img src="/static/images/blog/trace.webp" alt="PCB traces close-up" style="max-width: 40%; height: auto;">
            </div>
            <p style="text-align: center; font-size: 0.9em; color: #666; margin-top: -10px; margin-bottom: 20px;"><em>PCB trace routing patterns and copper path details</em></p>
            
            <h2>Milling the PCB</h2>
            <p>With the design finalized, it was time to manufacture the board. Using a PCB mill, I machined the according to my design files.</p>
            <img src="/static/images/blog/milll.jpg" alt="PCB milling machine" style="max-width: 100%; height: auto; margin: 20px 0;">
            <p style="text-align: center; font-size: 0.9em; color: #666; margin-top: -10px; margin-bottom: 20px;"><em>PCB mill </em></p>
            <p>The milling process removes copper to create the isolated traces and pads. It's fascinating to watch the precision machine carve out your design in real-time. The result is a professional-looking board ready for soldering.</p>
            <div style="text-align: center;">
                <img src="/static/images/blog/pcb.webp" alt="Finished milled PCB" style="max-width: 100%; height: auto; margin: 20px auto; display: inline-block;">
            </div>
            <p style="text-align: center; font-size: 0.9em; color: #666; margin-top: -10px; margin-bottom: 20px;"><em>PCB 3d render</em></p>
            
            <h2>Next Steps</h2>
            <p>With the PCB successfully milled, the next phase of the project awaits. Next week, I plan to solder all the components onto the board. After that, I'll 3D print the enclosure and then laser cut and engrave the acrylic panel for the final lightbox assembly.</p>
        `
    }
];

// Sort posts by date (newest first) - this ensures the newest post is always at the top
blogPosts.sort((a, b) => b.dateSort - a.dateSort);