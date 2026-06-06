/* quiz.js — Cancan's Corner Wrapping Style Quiz */
(function () {
    'use strict';

    // ── Questions ─────────────────────────────────────────────────────────
    const QUESTIONS = [
        {
            id: 'recipient',
            q:  'Who is this gift for?',
            opts: [
                { v: 'her',    label: 'For Her',    e: '👩' },
                { v: 'him',    label: 'For Him',    e: '👨' },
                { v: 'kids',   label: 'For Kids',   e: '🧒' },
                { v: 'anyone', label: 'For Anyone', e: '🎀' },
            ],
        },
        {
            id: 'occasion',
            q:  "What's the occasion?",
            opts: [
                { v: 'birthday',   label: 'Birthday',           e: '🎂' },
                { v: 'holiday',    label: 'Holiday / Christmas', e: '🎄' },
                { v: 'graduation', label: 'Graduation',          e: '🎓' },
                { v: 'special',    label: 'Special Moment',      e: '💝' },
            ],
        },
        {
            id: 'style',
            q:  "What's their vibe?",
            opts: [
                { v: 'classic', label: 'Classic & Elegant', e: '✨' },
                { v: 'fun',     label: 'Fun & Colorful',    e: '🌈' },
                { v: 'rustic',  label: 'Natural & Rustic',  e: '🌿' },
                { v: 'glam',    label: 'Glam & Bold',       e: '💫' },
            ],
        },
    ];

    // ── Results lookup ────────────────────────────────────────────────────
    const RESULTS = {
        // her × birthday
        'her-birthday-classic': { cat:'For Her',          paper:'Botanical Birthday',    ribbon:'Satin Purple & Gold',     line:"Elegant florals she'll love every detail of." },
        'her-birthday-fun':     { cat:'For Her',          paper:'Neon Animal Print',     ribbon:'Colorful Polka Dots',     line:"Bold, bright, and totally unexpected!" },
        'her-birthday-glam':    { cat:'For Her',          paper:'Glam Birthday',         ribbon:'Holographic Shimmer',     line:"Sparkly and show-stopping — pure glam!" },
        'her-birthday-rustic':  { cat:'For Her',          paper:'Pink Floral',           ribbon:'Burlap & Lace',           line:"Soft florals with a natural touch — effortlessly pretty." },
        // him × birthday
        'him-birthday-classic': { cat:'For Him',          paper:'Geometric Birthday',    ribbon:'Gold Diagonal Stripe',    line:"Sharp and polished — just like him." },
        'him-birthday-fun':     { cat:'For Him',          paper:'Birthday Plaid',        ribbon:'Buffalo Check Plaid',     line:"Coordinated and bold — he'll love it!" },
        'him-birthday-glam':    { cat:'General Birthday', paper:'Black & Gold Birthday', ribbon:'Chalkboard & Gold',       line:"Sleek, sophisticated, and impressive." },
        'him-birthday-rustic':  { cat:'For Him',          paper:'Outdoor Adventure',     ribbon:'Camo',                    line:"Rugged and outdoorsy — perfectly him." },
        // kids × birthday
        'kids-birthday-classic':{ cat:'General Birthday', paper:'Royalty',               ribbon:'Gold & Pink Dots',        line:"Royal treatment for your little one!" },
        'kids-birthday-fun':    { cat:'General Birthday', paper:'Tan Birthday',           ribbon:'Colorful Polka Dots',     line:"Festive and fun — kids will love it!" },
        'kids-birthday-glam':   { cat:'General Birthday', paper:'Black & Gold Birthday', ribbon:'Glittery Polka Dots',     line:"Even little ones deserve a little glam!" },
        'kids-birthday-rustic': { cat:'General Birthday', paper:'Royalty',               ribbon:'Rustic Kraft & Twine',    line:"Simple, sweet, and wrapped with love." },
        // anyone × birthday
        'anyone-birthday-classic':{ cat:'General Birthday', paper:'Black & Gold Birthday', ribbon:'Gold Diagonal Stripe',  line:"Timeless and celebratory — perfect for anyone." },
        'anyone-birthday-fun':    { cat:'General Birthday', paper:'Royalty',               ribbon:'Colorful Polka Dots',   line:"Fun, festive, and ready to celebrate!" },
        'anyone-birthday-glam':   { cat:'General Birthday', paper:'Black & Gold Birthday', ribbon:'Holographic Shimmer',   line:"Glamorous and bold — guaranteed wow factor." },
        'anyone-birthday-rustic': { cat:'General Birthday', paper:'Tan Birthday',           ribbon:'Burlap & Lace',         line:"Warm and natural — wrapped with care." },
        // × holiday
        'her-holiday-classic':  { cat:'Christmas', paper:'Classic Christmas', ribbon:'Christmas Snowflakes', line:"Classic Christmas magic she'll always cherish." },
        'her-holiday-fun':      { cat:'Christmas', paper:'Classic Christmas', ribbon:'XOXO',                line:"Festive and sweet — holiday hugs and kisses!" },
        'her-holiday-glam':     { cat:'Christmas', paper:'Light Blue',        ribbon:'Holographic Shimmer', line:"Frosty and glamorous — a holiday showstopper!" },
        'her-holiday-rustic':   { cat:'Christmas', paper:'Classic Christmas', ribbon:'Burlap & Lace',       line:"Cozy Christmas vibes — warm and lovely." },
        'him-holiday-classic':  { cat:'Christmas', paper:'Classic Christmas', ribbon:'Christmas Snowflakes', line:"Classic and crisp — a perfect holiday look." },
        'him-holiday-fun':      { cat:'Christmas', paper:'Camo Christmas',    ribbon:'Buffalo Check Plaid', line:"Country Christmas plaid — uniquely him!" },
        'him-holiday-glam':     { cat:'Christmas', paper:'Classic Christmas', ribbon:'Chalkboard & Gold',   line:"Bold and festive — impressive under the tree." },
        'him-holiday-rustic':   { cat:'Christmas', paper:'Camo Christmas',    ribbon:'Camo',                line:"Country Christmas done right!" },
        'kids-holiday-classic': { cat:'Christmas', paper:'Classic Christmas', ribbon:'Christmas Snowflakes', line:"Classic Christmas magic for the little ones!" },
        'kids-holiday-fun':     { cat:'Christmas', paper:'Classic Christmas', ribbon:'Colorful Polka Dots',  line:"Christmas morning magic — kids will go wild!" },
        'kids-holiday-glam':    { cat:'Christmas', paper:'Light Blue',         ribbon:'Glittery Polka Dots',  line:"A magical, sparkly Christmas look!" },
        'kids-holiday-rustic':  { cat:'Christmas', paper:'Classic Christmas', ribbon:'Burlap & Lace',        line:"Cozy Christmas vibes the kids will love!" },
        'anyone-holiday-classic':{ cat:'Christmas', paper:'Classic Christmas', ribbon:'Christmas Snowflakes', line:"Timeless Christmas for anyone on your list." },
        'anyone-holiday-fun':    { cat:'Christmas', paper:'Classic Reindeer',  ribbon:'Colorful Polka Dots',  line:"Fun and festive — holiday cheer for everyone!" },
        'anyone-holiday-glam':   { cat:'Christmas', paper:'Light Blue',         ribbon:'Holographic Shimmer',  line:"Frosty and glamorous!" },
        'anyone-holiday-rustic': { cat:'Christmas', paper:'Camo Christmas',    ribbon:'Burlap & Lace',        line:"Rustic holiday charm — warm and welcoming." },
        // × graduation
        'her-graduation-classic':  { cat:'Graduation', paper:'Black & Gold',   ribbon:'Graduation Black & Gold', line:"Classic grad colors — she worked hard for this!" },
        'her-graduation-fun':      { cat:'Graduation', paper:'Pink Hats',       ribbon:'Purple Gold Grad',        line:"Girly and celebratory — congrats grad!" },
        'her-graduation-glam':     { cat:'Graduation', paper:'Navy Gold Grad',  ribbon:'Satin Purple & Gold',     line:"Sophisticated and polished — all eyes on her!" },
        'her-graduation-rustic':   { cat:'Graduation', paper:'Pink Camo Grad',  ribbon:'Burlap & Lace',           line:"Camo-chic graduation — uniquely her." },
        'him-graduation-classic':  { cat:'Graduation', paper:'Navy Gold Grad',  ribbon:'Graduation Black & Gold', line:"Sharp and proud — a graduate's dream wrap." },
        'him-graduation-fun':      { cat:'Graduation', paper:'Colorful Caps',   ribbon:'Purple Gold Grad',        line:"Bright and celebratory — congrats!" },
        'him-graduation-glam':     { cat:'Graduation', paper:'Black & Gold',    ribbon:'Satin Purple & Gold',     line:"Polished and prestigious — a graduation to remember." },
        'him-graduation-rustic':   { cat:'Graduation', paper:'Tan Camo Grad',   ribbon:'Camo',                    line:"Outdoorsy grad style — uniquely him." },
        'kids-graduation-classic': { cat:'Graduation', paper:'Black & Gold',    ribbon:'Graduation Black & Gold', line:"Classic colors for a classic achievement!" },
        'kids-graduation-fun':     { cat:'Graduation', paper:'Colorful Caps',   ribbon:'Colorful Polka Dots',     line:"Bright and celebratory for a proud new grad!" },
        'anyone-graduation-classic':{ cat:'Graduation', paper:'Black & Gold',   ribbon:'Graduation Black & Gold', line:"Timeless grad colors — celebrate the milestone!" },
        'anyone-graduation-fun':    { cat:'Graduation', paper:'Colorful Caps',  ribbon:'Purple Gold Grad',        line:"Colorful and celebratory — they did it!" },
        'anyone-graduation-glam':   { cat:'Graduation', paper:'Navy Gold Grad', ribbon:'Satin Purple & Gold',     line:"Polished and prestigious — congrats!" },
        'anyone-graduation-rustic': { cat:'Graduation', paper:'Tan Camo Grad',  ribbon:'Rustic Kraft & Twine',    line:"Unique and earthy — a gift they won't forget." },
        // × special moment
        'her-special-classic':   { cat:'Anniversary', paper:'Romantic',         ribbon:'Satin Purple & Gold',     line:"Romantic and timeless — love wrapped beautifully." },
        'her-special-fun':       { cat:'For Her',     paper:'Pink Floral',       ribbon:'Val Day 1',               line:"Sweet and romantic — she'll be touched!" },
        'her-special-glam':      { cat:'Anniversary', paper:'Black & Gold',      ribbon:'Holographic Shimmer',     line:"As dazzling as the moment itself!" },
        'her-special-rustic':    { cat:'Anniversary', paper:'Silver & White',    ribbon:'Burlap & Lace',           line:"Clean and lovely — thoughtfully wrapped." },
        'him-special-classic':   { cat:'Anniversary', paper:'More Everyday',     ribbon:'Gold Diagonal Stripe',    line:"Classic and heartfelt — perfect for him." },
        'him-special-fun':       { cat:'Anniversary', paper:'Thanks For',        ribbon:'Buffalo Check Plaid',     line:"Warm and fun — a gift worth smiling about!" },
        'him-special-glam':      { cat:'Anniversary', paper:'Black & Gold',      ribbon:'Chalkboard & Gold',       line:"Bold and impressive — for a moment that deserves it." },
        'him-special-rustic':    { cat:'For Him',     paper:'Outdoor Adventure', ribbon:'Rustic Kraft & Twine',    line:"Natural and warm — for any special day." },
        'kids-special-classic':  { cat:'General Birthday', paper:'Royalty',      ribbon:'Gold & Pink Dots',        line:"Royally wrapped for a very special kid!" },
        'kids-special-fun':      { cat:'General Birthday', paper:'Royalty',      ribbon:'Colorful Polka Dots',     line:"Royally wrapped — perfect for any young one!" },
        'anyone-special-classic':{ cat:'Anniversary', paper:'Romantic',          ribbon:'Satin Purple & Gold',     line:"Romantic and elegant — for that special someone." },
        'anyone-special-glam':   { cat:'Anniversary', paper:'Black & Gold',      ribbon:'Holographic Shimmer',     line:"Bold and glamorous — make it unforgettable." },
        'anyone-special-fun':    { cat:'General Birthday', paper:'Royalty',       ribbon:'XOXO',                   line:"Sweet and fun — they'll feel so loved!" },
        'anyone-special-rustic': { cat:'Anniversary', paper:'Thanks For',        ribbon:'Burlap & Lace',           line:"Warm and heartfelt — wrapped with gratitude." },
    };

    function getResult(r, o, s) {
        return RESULTS[`${r}-${o}-${s}`]
            || RESULTS[`anyone-${o}-${s}`]
            || RESULTS[`${r}-birthday-${s}`]
            || RESULTS[`anyone-birthday-${s}`]
            || { cat:'General Birthday', paper:'Black & Gold Birthday', ribbon:'Holographic Shimmer', line:"A bold and glamorous wrap they'll absolutely love!" };
    }

    // ── CSS ───────────────────────────────────────────────────────────────
    const CSS = `
        #quiz-float-btn {
            position: fixed;
            bottom: 30px;
            right: 24px;
            background: linear-gradient(135deg, #3d1a6e, #5c2d9e);
            color: #f5d79a;
            border: 1.5px solid rgba(195,149,89,0.5);
            border-radius: 50px;
            padding: 0.7rem 1.3rem;
            font-family: 'Poppins', sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            z-index: 9000;
            box-shadow: 0 6px 20px rgba(0,0,0,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
            letter-spacing: 0.02em;
        }
        #quiz-float-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.6); }

        #quiz-backdrop {
            position: fixed; inset: 0;
            background: rgba(8,3,22,0.96);
            z-index: 19999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        #quiz-backdrop.open { display: flex; }

        #quiz-modal {
            width: min(500px, 94vw);
            background: linear-gradient(145deg, #1a0a30, #20113c);
            border: 1px solid rgba(195,149,89,0.35);
            border-radius: 24px;
            padding: 2rem 2rem 1.75rem;
            box-shadow: 0 40px 80px rgba(0,0,0,0.7);
            position: relative;
            font-family: 'Poppins', sans-serif;
            color: #f5d79a;
        }
        #quiz-close {
            position: absolute; top: 14px; right: 16px;
            background: none; border: none;
            color: rgba(245,215,154,0.45); font-size: 1.1rem; cursor: pointer;
            transition: color 0.2s; line-height: 1;
        }
        #quiz-close:hover { color: #f5d79a; }

        .quiz-header { text-align: center; margin-bottom: 0.5rem; }
        .quiz-header-title { font-size: 1rem; font-weight: 700; color: #f5d79a; letter-spacing: 0.03em; }
        .quiz-header-sub   { font-size: 0.78rem; color: rgba(245,215,154,0.55); margin-top: 0.15rem; }

        .quiz-progress { display: flex; gap: 8px; justify-content: center; margin: 1rem 0 1.5rem; }
        .quiz-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(195,149,89,0.2); transition: background 0.3s; }
        .quiz-dot.done   { background: #c39559; }
        .quiz-dot.active { background: #f5d79a; box-shadow: 0 0 6px rgba(245,215,154,0.5); }

        .quiz-q-text {
            font-size: 1.15rem; font-weight: 600; color: #f5d79a;
            margin-bottom: 1.25rem; text-align: center; line-height: 1.4;
        }
        .quiz-opts {
            display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
        }
        .quiz-opt {
            background: rgba(255,255,255,0.04);
            border: 1.5px solid rgba(195,149,89,0.2);
            border-radius: 14px; padding: 1rem 0.75rem;
            cursor: pointer; transition: background 0.15s, border-color 0.15s, transform 0.15s;
            display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .quiz-opt:hover {
            background: rgba(195,149,89,0.12);
            border-color: rgba(195,149,89,0.55);
            transform: translateY(-2px);
        }
        .quiz-opt-emoji { font-size: 1.9rem; }
        .quiz-opt-label { font-size: 0.82rem; font-weight: 600; color: #e8d4a0; text-align: center; }

        /* Result */
        .quiz-result { text-align: center; }
        .quiz-result-trophy { font-size: 2.2rem; display: block; margin-bottom: 0.5rem; }
        .quiz-result-title  { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
        .quiz-result-line   { font-size: 0.87rem; color: #c9b37e; font-style: italic; margin-bottom: 1.25rem; }
        .quiz-result-box {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(195,149,89,0.25);
            border-radius: 14px; padding: 1rem; margin-bottom: 1.25rem;
            text-align: left;
        }
        .qrr { display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0; }
        .qrr + .qrr { border-top: 1px solid rgba(195,149,89,0.12); }
        .qrr-label { font-size: 0.75rem; color: rgba(245,215,154,0.55); text-transform: uppercase; letter-spacing: 0.06em; }
        .qrr-value { font-size: 0.88rem; font-weight: 600; color: #f5d79a; text-align: right; max-width: 60%; }
        .quiz-btns { display: flex; flex-direction: column; gap: 0.6rem; }
        .qb-primary {
            display: block; text-align: center;
            background: linear-gradient(135deg, #c39559, #f5d79a);
            color: #1a0a30; font-weight: 700; font-size: 0.9rem;
            padding: 0.85rem; border-radius: 12px;
            text-decoration: none; cursor: pointer;
            transition: opacity 0.2s;
        }
        .qb-primary:hover { opacity: 0.87; }
        .qb-retake {
            background: none; border: 1px solid rgba(195,149,89,0.3);
            color: rgba(245,215,154,0.6); font-size: 0.8rem;
            padding: 0.6rem; border-radius: 10px; cursor: pointer;
            transition: color 0.2s, border-color 0.2s;
            font-family: 'Poppins', sans-serif;
        }
        .qb-retake:hover { color: #f5d79a; border-color: rgba(195,149,89,0.65); }

        @media (max-width: 480px) {
            #quiz-modal { padding: 1.5rem 1.25rem 1.25rem; }
            .quiz-q-text { font-size: 1rem; }
            .quiz-opt-emoji { font-size: 1.6rem; }
        }
    `;

    // ── State ─────────────────────────────────────────────────────────────
    let answers  = {};
    let qIndex   = 0;
    let backdrop = null;

    // ── Helpers ───────────────────────────────────────────────────────────
    function injectCSS() {
        const s = document.createElement('style');
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function injectFloatBtn() {
        const btn = document.createElement('button');
        btn.id = 'quiz-float-btn';
        btn.innerHTML = '🎀 Find My Style';
        btn.setAttribute('aria-label', 'Take the wrapping style quiz');
        btn.onclick = openQuiz;
        document.body.appendChild(btn);
    }

    // ── Modal lifecycle ───────────────────────────────────────────────────
    function openQuiz() {
        answers = {};
        qIndex  = 0;
        if (!backdrop) buildModal();
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderQuestion();
    }
    window.openQuiz = openQuiz;

    function closeQuiz() {
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    function buildModal() {
        backdrop = document.createElement('div');
        backdrop.id = 'quiz-backdrop';
        backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) closeQuiz();
        });

        const modal = document.createElement('div');
        modal.id = 'quiz-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Wrapping Style Quiz');

        const closeBtn = document.createElement('button');
        closeBtn.id = 'quiz-close';
        closeBtn.innerHTML = '✕';
        closeBtn.title = 'Close quiz';
        closeBtn.onclick = closeQuiz;
        modal.appendChild(closeBtn);

        const header = document.createElement('div');
        header.className = 'quiz-header';
        header.innerHTML = '<div class="quiz-header-title">🎀 Wrapping Style Quiz</div><div class="quiz-header-sub">3 quick questions — we\'ll find your perfect match</div>';
        modal.appendChild(header);

        const prog = document.createElement('div');
        prog.className = 'quiz-progress';
        prog.id = 'quiz-progress';
        QUESTIONS.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'quiz-dot';
            dot.id = `quiz-dot-${i}`;
            prog.appendChild(dot);
        });
        modal.appendChild(prog);

        const content = document.createElement('div');
        content.id = 'quiz-content';
        modal.appendChild(content);

        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && backdrop && backdrop.classList.contains('open')) closeQuiz();
        });
    }

    function renderQuestion() {
        const q       = QUESTIONS[qIndex];
        const content = document.getElementById('quiz-content');

        QUESTIONS.forEach((_, i) => {
            const dot = document.getElementById(`quiz-dot-${i}`);
            if (dot) dot.className = 'quiz-dot' + (i < qIndex ? ' done' : i === qIndex ? ' active' : '');
        });

        content.innerHTML = `
            <div class="quiz-q-text">${q.q}</div>
            <div class="quiz-opts">
                ${q.opts.map(opt => `
                    <button class="quiz-opt" data-val="${opt.v}">
                        <span class="quiz-opt-emoji">${opt.e}</span>
                        <span class="quiz-opt-label">${opt.label}</span>
                    </button>
                `).join('')}
            </div>`;

        content.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.addEventListener('click', function () {
                answers[q.id] = this.dataset.val;
                qIndex++;
                if (qIndex < QUESTIONS.length) renderQuestion();
                else showResult();
            });
        });
    }

    function showResult() {
        const r = getResult(answers.recipient, answers.occasion, answers.style);

        const params = new URLSearchParams({
            tab:      'book',
            quiz:     '1',
            occasion: r.cat,
            paper:    r.paper,
            ribbon:   r.ribbon,
        });
        const previewUrl = 'contact.html?' + params.toString();

        QUESTIONS.forEach((_, i) => {
            const dot = document.getElementById(`quiz-dot-${i}`);
            if (dot) dot.className = 'quiz-dot done';
        });

        const content = document.getElementById('quiz-content');
        content.innerHTML = `
            <div class="quiz-result">
                <span class="quiz-result-trophy">🎉</span>
                <div class="quiz-result-title">Your Perfect Wrap!</div>
                <div class="quiz-result-line">${r.line}</div>
                <div class="quiz-result-box">
                    <div class="qrr">
                        <span class="qrr-label">🎁 Wrapping Paper</span>
                        <span class="qrr-value">${r.paper}</span>
                    </div>
                    <div class="qrr">
                        <span class="qrr-label">🎀 Ribbon</span>
                        <span class="qrr-value">${r.ribbon}</span>
                    </div>
                    <div class="qrr">
                        <span class="qrr-label">📁 Category</span>
                        <span class="qrr-value">${r.cat}</span>
                    </div>
                </div>
                <div class="quiz-btns">
                    <a class="qb-primary" href="${previewUrl}">🎁 Preview &amp; Book This Design →</a>
                    <button class="qb-retake" id="quiz-retake">↩ Retake the quiz</button>
                </div>
            </div>`;

        document.getElementById('quiz-retake')?.addEventListener('click', function () {
            answers = {};
            qIndex  = 0;
            renderQuestion();
        });
    }

    // ── Boot ──────────────────────────────────────────────────────────────
    function boot() {
        injectCSS();
        injectFloatBtn();
    }

    if (document.body) boot();
    else document.addEventListener('DOMContentLoaded', boot);

})();
