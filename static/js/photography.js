document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('photo-gallery');
    if (!grid) {
        return;
    }

    if (typeof Masonry === 'undefined' || typeof imagesLoaded === 'undefined' ||
        typeof PhotoSwipe === 'undefined' || typeof PhotoSwipeLightbox === 'undefined') {
        const message = 'The gallery tools could not load. Refresh to try again, or open a photograph directly.';
        const error = document.getElementById('photo-error');
        error.textContent = message;
        error.hidden = false;
        console.error(message);
        return;
    }

    const layout = new Masonry(grid, {
        itemSelector: '.photo-item',
        columnWidth: '.photo-grid-sizer',
        gutter: '.photo-gutter-sizer',
        percentPosition: true
    });
    imagesLoaded(grid).on('progress', () => layout.layout());

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#photo-gallery',
        children: 'a',
        pswpModule: PhotoSwipe,
        bgOpacity: 0.95,
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        initialZoomLevel: zoomLevels => Math.min(
            zoomLevels.panAreaSize.x / zoomLevels.elementSize.x,
            zoomLevels.panAreaSize.y / zoomLevels.elementSize.y
        ),
        secondaryZoomLevel: zoomLevels => zoomLevels.initial * 2,
        maxZoomLevel: zoomLevels => zoomLevels.initial * 4,
        errorMsg: 'The photograph could not be loaded. Please try again.'
    });
    lightbox.on('uiRegister', () => {
        lightbox.pswp.ui.registerElement({
            name: 'download',
            order: 8,
            isButton: true,
            tagName: 'a',
            title: 'Download photograph',
            ariaLabel: 'Download photograph',
            html: '<svg class="pswp__icn" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5v15m-6-6 6 6 6-6M7 23v4h18v-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            onInit: (element, pswp) => {
                element.setAttribute('download', '');
                pswp.on('change', () => {
                    element.href = pswp.getItemData(pswp.currIndex).element.dataset.downloadUrl;
                });
            }
        });
    });
    lightbox.init();
});
