/* seasonal.js — Cancan's Corner holiday auto-theming */
(function () {
    'use strict';

    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12
    const day   = now.getDate();
    const today = new Date(year, month - 1, day);
    const md    = month * 100 + day; // e.g. Feb 14 → 214

    function daysUntil(date) {
        return Math.ceil((date - today) / 86400000);
    }

    function getEaster(y) {
        const a = y % 19, b = Math.floor(y / 100), c = y % 100,
              d = Math.floor(b / 4), e = b % 4,
              f = Math.floor((b + 8) / 25),
              g = Math.floor((b - f + 1) / 3),
              h = (19 * a + b - d - g + 15) % 30,
              i = Math.floor(c / 4), k = c % 4,
              l = (32 + 2 * e + 2 * i - h - k) % 7,
              m = Math.floor((a + 11 * h + 22 * l) / 451),
              mo = Math.floor((h + l - 7 * m + 114) / 31),
              da = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(y, mo - 1, da);
    }

    function getNthWeekday(y, mo0, weekday, n) {
        const d    = new Date(y, mo0, 1);
        const diff = (weekday - d.getDay() + 7) % 7;
        return new Date(y, mo0, 1 + diff + (n - 1) * 7);
    }

    function dBefore(date, n) {
        const d = new Date(date);
        d.setDate(d.getDate() - n);
        return d;
    }

    // ── Variable holidays ─────────────────────────────────────────────────
    const easterDate       = getEaster(year);
    const mothersDayDate   = getNthWeekday(year, 4,  0, 2); // May, Sun, 2nd
    const fathersDayDate   = getNthWeekday(year, 5,  0, 3); // Jun, Sun, 3rd
    const thanksgivingDate = getNthWeekday(year, 10, 4, 4); // Nov, Thu, 4th

    // ── Detect active holiday ─────────────────────────────────────────────
    let theme = null;

    // Fixed-date windows
    if      (md >= 1226 || md <= 102)           theme = 'newyear';
    else if (md >= 125  && md <= 214)            theme = 'valentine';
    else if (md >= 310  && md <= 317)            theme = 'stpatrick';
    else if (md >= 627  && md <= 704)            theme = 'july4';
    else if (md >= 1015 && md <= 1031)           theme = 'halloween';
    else if (md >= 1201 && md <= 1225)           theme = 'christmas';

    // Variable-date windows (14-day lead-up + the day itself)
    if (!theme && today >= dBefore(easterDate,       14) && today <= easterDate)       theme = 'easter';
    if (!theme && today >= dBefore(mothersDayDate,   14) && today <= mothersDayDate)   theme = 'mothers';
    if (!theme && today >= dBefore(fathersDayDate,   16) && today <= fathersDayDate)   theme = 'fathers';
    if (!theme && today >= dBefore(thanksgivingDate, 14) && today <= thanksgivingDate) theme = 'thanksgiving';

    if (!theme) return; // Default purple/gold theme — nothing to do

    // ── Theme library ─────────────────────────────────────────────────────
    const THEMES = {
        newyear: {
            emoji:  '🎆',
            colors: ['#FFD700','#C0C0C0','#fffde7','#ECE9E1','#f5d79a'],
            bg:     'linear-gradient(135deg,#1a1a2e,#2d2d44)',
            border: 'rgba(255,215,0,0.75)',
            msg() {
                const ny  = new Date(month === 12 ? year + 1 : year, 0, 1);
                const d   = daysUntil(ny);
                return d > 0
                    ? `🎆 New Year's is <strong>${d} day${d===1?'':'s'}</strong> away — start it with beautifully wrapped gifts! <a href="contact.html?tab=book">Book now →</a>`
                    : "🎆 Happy New Year from Cancan's Corner! Wishing you a magical year ahead 🌟";
            },
        },
        valentine: {
            emoji:  '💝',
            colors: ['#ff6b9d','#e91e8c','#ff1744','#ffb3c6','#ff8fab','#fff0f3'],
            bg:     'linear-gradient(135deg,#4a0028,#8b0040)',
            border: 'rgba(255,107,157,0.75)',
            msg() {
                const d = daysUntil(new Date(year, 1, 14));
                return d > 0
                    ? `💝 Valentine's Day is <strong>${d} day${d===1?'':'s'}</strong> away — make it extra special! <a href="contact.html?tab=book">Book gift wrapping →</a>`
                    : "💝 Happy Valentine's Day! Spread love with a beautifully wrapped gift 💖";
            },
        },
        stpatrick: {
            emoji:  '☘️',
            colors: ['#2d8a4e','#3cb371','#90EE90','#FFD700','#c8f5c8'],
            bg:     'linear-gradient(135deg,#0d3b1e,#1a5c30)',
            border: 'rgba(60,179,113,0.75)',
            msg() {
                const d = daysUntil(new Date(year, 2, 17));
                return d > 0
                    ? `☘️ St. Patrick's Day is <strong>${d} day${d===1?'':'s'}</strong> away — feel lucky with a wrapped gift! <a href="contact.html?tab=book">Book now →</a>`
                    : "☘️ Happy St. Patrick's Day! May your gifts be as lucky as a four-leaf clover 🍀";
            },
        },
        easter: {
            emoji:  '🐣',
            colors: ['#FFB7C5','#B5EAD7','#FFDAC1','#C7CEEA','#FFD1DC','#E2F0CB'],
            bg:     'linear-gradient(135deg,#3d1a4a,#5c2c6e)',
            border: 'rgba(255,183,197,0.75)',
            msg() {
                const d = daysUntil(easterDate);
                return d > 0
                    ? `🐣 Easter is <strong>${d} day${d===1?'':'s'}</strong> away — hop to it and book your gift wrapping! <a href="contact.html?tab=book">Book now →</a>`
                    : '🐣 Happy Easter! Wishing you a bright and joyful day 🌷';
            },
        },
        mothers: {
            emoji:  '💐',
            colors: ['#ffb3c6','#ff8fab','#ffc8dd','#ffafcc','#ffe5ec','#ff6b9d'],
            bg:     'linear-gradient(135deg,#4a1535,#7a2055)',
            border: 'rgba(255,143,171,0.75)',
            msg() {
                const d = daysUntil(mothersDayDate);
                return d > 0
                    ? `💐 Mother's Day is <strong>${d} day${d===1?'':'s'}</strong> away — make mom feel like royalty! <a href="contact.html?tab=book">Book gift wrapping →</a>`
                    : "💐 Happy Mother's Day! You deserve every beautiful thing 🌸";
            },
        },
        fathers: {
            emoji:  '👔',
            colors: ['#003087','#1a4db3','#4169E1','#FFD700','#87CEEB','#b8d4f0'],
            bg:     'linear-gradient(135deg,#001a4d,#002b80)',
            border: 'rgba(65,105,225,0.75)',
            msg() {
                const d = daysUntil(fathersDayDate);
                return d > 0
                    ? `👔 Father's Day is <strong>${d} day${d===1?'':'s'}</strong> away — give dad a gift worth showing off! <a href="contact.html?tab=book">Book now →</a>`
                    : "👔 Happy Father's Day! Here's to the dads who deserve the best 🏆";
            },
        },
        july4: {
            emoji:  '🎆',
            colors: ['#cc2936','#ffffff','#003087','#ff6b6b','#87CEEB','#b3d1f5'],
            bg:     'linear-gradient(135deg,#1a0010,#2e0020)',
            border: 'rgba(204,41,54,0.75)',
            msg() {
                const d = daysUntil(new Date(year, 6, 4));
                return d > 0
                    ? `🎆 Independence Day is <strong>${d} day${d===1?'':'s'}</strong> away — celebrate with wrapped gifts! <a href="contact.html?tab=book">Book now →</a>`
                    : '🎆 Happy 4th of July! 🇺🇸 Enjoy the fireworks!';
            },
        },
        halloween: {
            emoji:  '🎃',
            colors: ['#ff6600','#ff8c00','#4B0082','#9400D3','#1a1a1a','#ff9d00'],
            bg:     'linear-gradient(135deg,#1a0a00,#2d1000)',
            border: 'rgba(255,102,0,0.75)',
            msg() {
                const d = daysUntil(new Date(year, 9, 31));
                return d > 0
                    ? `🎃 Halloween is <strong>${d} day${d===1?'':'s'}</strong> away — spook them with a beautifully wrapped gift! <a href="contact.html?tab=book">Book now →</a>`
                    : '🎃 Happy Halloween! Hope your night is full of treats 👻';
            },
        },
        thanksgiving: {
            emoji:  '🦃',
            colors: ['#c45c13','#8b4513','#DAA520','#b5651d','#f4a460','#ffe4b5'],
            bg:     'linear-gradient(135deg,#2d1500,#4a2000)',
            border: 'rgba(218,165,32,0.75)',
            msg() {
                const d = daysUntil(thanksgivingDate);
                return d > 0
                    ? `🦃 Thanksgiving is <strong>${d} day${d===1?'':'s'}</strong> away — wrap a gift for the ones you're thankful for! <a href="contact.html?tab=book">Book now →</a>`
                    : "🦃 Happy Thanksgiving! Grateful for every gift we get to wrap 🍂";
            },
        },
        christmas: {
            emoji:  '🎄',
            colors: ['#cc0000','#006400','#FFD700','#ffffff','#8B0000','#90EE90'],
            bg:     'linear-gradient(135deg,#0d2b00,#1a4700)',
            border: 'rgba(204,0,0,0.75)',
            msg() {
                const d = daysUntil(new Date(year, 11, 25));
                return d > 0
                    ? `🎄 Christmas is <strong>${d} day${d===1?'':'s'}</strong> away — <a href="contact.html?tab=book">book your drop-off now</a> before slots fill up! 🎁`
                    : "🎄 Merry Christmas from Cancan's Corner! Wishing you a magical day 🎁";
            },
        },
    };

    const t = THEMES[theme];
    if (!t) return;

    // Expose globally so other scripts (e.g. confetti) can read holiday colors
    window.CANCAN_HOLIDAY = { theme, colors: t.colors, emoji: t.emoji };

    // ── Banner ────────────────────────────────────────────────────────────
    function injectBanner() {
        if (document.getElementById('holiday-banner')) return;
        if (sessionStorage.getItem('hb-dismissed') === theme) return;

        const bar = document.createElement('div');
        bar.id = 'holiday-banner';
        bar.style.cssText = [
            'background:'    + t.bg,
            'border-bottom:2px solid ' + t.border,
            'color:#f5d79a',
            'text-align:center',
            'padding:0.6rem 3rem 0.6rem 1.5rem',
            "font-family:'Poppins',sans-serif",
            'font-size:0.86rem',
            'line-height:1.5',
            'position:relative',
            'z-index:10001',
        ].join(';');

        bar.innerHTML = t.msg();

        bar.querySelectorAll('a').forEach(a => {
            a.style.cssText = 'color:#f5d79a;font-weight:700;text-decoration:underline;';
        });

        const btn = document.createElement('button');
        btn.innerHTML = '✕';
        btn.title = 'Dismiss';
        btn.style.cssText = [
            'position:absolute','right:10px','top:50%','transform:translateY(-50%)',
            'background:none','border:none','color:rgba(245,215,154,0.5)',
            'font-size:1rem','cursor:pointer','padding:4px 8px','line-height:1',
        ].join(';');
        btn.onmouseover = () => { btn.style.color = '#f5d79a'; };
        btn.onmouseout  = () => { btn.style.color = 'rgba(245,215,154,0.5)'; };
        btn.onclick = () => {
            bar.style.display = 'none';
            sessionStorage.setItem('hb-dismissed', theme);
        };
        bar.appendChild(btn);
        document.body.insertBefore(bar, document.body.firstChild);
    }

    // ── Confetti recolor ──────────────────────────────────────────────────
    function recolorConfetti() {
        const container = document.getElementById('confetti');
        if (!container) return;
        container.querySelectorAll('.confetti-dot').forEach(dot => {
            dot.style.background = t.colors[Math.floor(Math.random() * t.colors.length)];
        });
    }

    // ── Boot ──────────────────────────────────────────────────────────────
    if (document.body) {
        injectBanner();
        recolorConfetti();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            injectBanner();
            setTimeout(recolorConfetti, 200);
        });
    }

})();
