document.addEventListener('DOMContentLoaded', () => {
    const skillIcons = document.querySelectorAll('.skill-icon');
    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateIcons();
    });

    // Update window dimensions on resize
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    // Update icons on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateIcons);
    });

    function updateIcons() {
        skillIcons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from mouse
            const distanceX = (mouseX - centerX) / 30;
            const distanceY = (mouseY - centerY) / 30;

            // Calculate scroll position effect
            const scrollProgress = (rect.top + rect.height / 2) / windowHeight;
            const scrollEffect = Math.sin(scrollProgress * Math.PI) * 10;

            // Apply transform with smooth transition
            icon.style.transform = `
                perspective(1000px)
                rotateX(${-distanceY}deg)
                rotateY(${distanceX}deg)
                translateZ(${scrollEffect}px)
            `;

            // Update reflection opacity based on angle
            const reflectionOpacity = Math.abs(distanceX + distanceY) / 20;
            icon.style.setProperty('--reflection-opacity', reflectionOpacity);
        });
    }

    // Initial update
    updateIcons();
});