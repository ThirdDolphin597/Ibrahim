document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        return;
    }

    const body = document.body;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    themeToggle.addEventListener('click', async () => {
        const currentTheme = body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (!document.startViewTransition || reduceMotion.matches) {
            applyTheme(nextTheme);
            return;
        }

        const rect = themeToggle.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const radius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY)
        );

        themeToggle.disabled = true;
        body.classList.add('theme-transitioning');

        const transition = document.startViewTransition(() => {
            applyTheme(nextTheme);
        });

        try {
            await transition.ready;
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0 at ${originX}px ${originY}px)`,
                        `circle(${radius}px at ${originX}px ${originY}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
            await transition.finished;
        } finally {
            body.classList.remove('theme-transitioning');
            themeToggle.disabled = false;
        }
    });
});
