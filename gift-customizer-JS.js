/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  CANCAN'S CORNER — GIFT CUSTOMIZER: CLEAN JS BLOCK          ║
  ║                                                              ║
  ║  INSTRUCTIONS:                                               ║
  ║  1. In your contact.html, find the existing JS that          ║
  ║     references the old lightbox — look for:                 ║
  ║       previewLightbox                                        ║
  ║       preview-lightbox-close                                ║
  ║       lightboxCanvas                                         ║
  ║     DELETE any/all of those old lightbox JS blocks entirely. ║
  ║                                                              ║
  ║  2. The existing initGiftPreview(), drawBox(), recalc(),     ║
  ║     buildPaperSwatches(), etc. functions are ALL FINE —      ║
  ║     DO NOT TOUCH THEM. They use the canvas ID "giftBox"      ║
  ║     which is preserved in the new HTML block.               ║
  ║                                                              ║
  ║  3. Paste THIS block anywhere after window.addEventListener  ║
  ║     ('DOMContentLoaded', ...) has been defined, ideally      ║
  ║     just before the closing </script> tag of your main       ║
  ║     inline script block.                                     ║
  ╚══════════════════════════════════════════════════════════════╝
*/

// ── Gift Preview Lightbox ──────────────────────────────────────
(function () {
    'use strict';

    function openLightbox() {
        const lightbox = document.getElementById('gcLightbox');
        const lbCanvas = document.getElementById('lightboxCanvas');
        const srcCanvas = document.getElementById('giftBox');

        if (!lightbox || !lbCanvas || !srcCanvas) return;

        // Copy current canvas render into the lightbox canvas
        const ctx = lbCanvas.getContext('2d');
        lbCanvas.width  = srcCanvas.width  * 2;   // 2× for sharpness
        lbCanvas.height = srcCanvas.height * 2;
        ctx.drawImage(srcCanvas, 0, 0, lbCanvas.width, lbCanvas.height);

        // Show lightbox
        lightbox.removeAttribute('hidden');
        // Force reflow so the opacity transition fires
        lightbox.offsetHeight; // eslint-disable-line no-unused-expressions
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'all';

        document.body.style.overflow = 'hidden';
        lightbox.focus();
    }

    function closeLightbox() {
        const lightbox = document.getElementById('gcLightbox');
        if (!lightbox) return;

        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';

        // Re-add [hidden] after transition ends
        lightbox.addEventListener('transitionend', function handler() {
            lightbox.setAttribute('hidden', '');
            lightbox.removeEventListener('transitionend', handler);
        });

        document.body.style.overflow = '';
    }

    window.addEventListener('DOMContentLoaded', function () {
        // Open via Enlarge button
        const enlargeBtn = document.getElementById('gcEnlargeBtn');
        if (enlargeBtn) {
            enlargeBtn.addEventListener('click', openLightbox);
        }

        // Open via clicking the canvas wrapper
        const canvasWrap = document.getElementById('gcCanvasWrap');
        if (canvasWrap) {
            canvasWrap.addEventListener('click', openLightbox);
        }

        // Close via × button
        const closeBtn = document.getElementById('gcLightboxClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        // Close via clicking the backdrop (outside the inner box)
        const lightbox = document.getElementById('gcLightbox');
        if (lightbox) {
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
        }

        // Close via Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const lb = document.getElementById('gcLightbox');
                if (lb && !lb.hasAttribute('hidden')) closeLightbox();
            }
        });
    });

})();
