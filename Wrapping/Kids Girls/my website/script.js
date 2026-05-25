// =============================================
// CANCAN'S CORNER — script.js
// Ribbon bow cursor + sparkle trails
// =============================================

// ── Custom ribbon bow cursor ──
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 28px;
    height: 28px;
    pointer-events: none;
    z-index: 99999;
    font-size: 22px;
    line-height: 1;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    user-select: none;
`;
cursor.textContent = '🎀';
document.body.appendChild(cursor);

// Hide the default cursor site-wide
document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    // Sparkle trail
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = (e.clientX + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.top  = (e.clientY + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.position = 'fixed';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
});

// Slightly enlarge bow on click
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.4)';
});
document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});
