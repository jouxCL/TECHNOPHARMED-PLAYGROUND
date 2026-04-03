const fs = require('fs');
let code = fs.readFileSync('src/layouts/Layout.astro', 'utf8');

const toInsert = `
      .stagger-5 { transition-delay: 400ms !important; }

      /* ══ PAGE ORB BACKGROUNDS ══ */
      .page-orbs { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
      .page-orb  { position:absolute; border-radius:50%; filter:blur(90px); opacity:0;
                   animation: orbAppear 2s ease forwards, orbFloat 10s ease-in-out infinite; }
      .page-orb--1 { width:520px;height:520px;background:rgba(0,82,154,.06);top:-180px;right:-120px;animation-delay:0s,.5s; }
      .page-orb--2 { width:360px;height:360px;background:rgba(0,53,112,.04);bottom:-100px;left:-80px;animation-delay:.4s,1.2s; }
      .page-orb--3 { width:200px;height:200px;background:rgba(158,202,255,.035);top:40%;left:35%;animation-delay:.8s,3s; }
      @keyframes orbAppear { to { opacity:1; } }
      @keyframes orbFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }

      /* ══ SHIMMER EYEBROW ══ */
      .eyebrow-shimmer {
        display:inline-flex; align-items:center; gap:.45rem;
        background:linear-gradient(90deg,var(--md-primary-container) 0%,#c8deff 50%,var(--md-primary-container) 100%);
        background-size:200% auto; color:var(--md-primary);
        padding:.35rem 1rem; border-radius:var(--r-full);
        font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
        border:1px solid rgba(0,82,154,.18); margin-bottom:.85rem;
        animation:eyebrowShimmer 3s linear infinite;
      }
      @keyframes eyebrowShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

      /* ══ GLOW CARD ══ */
      .glow-card {
        background:var(--md-surface); border-radius:var(--r-lg);
        border:1px solid var(--md-outline-variant); box-shadow:var(--el-1);
        transition:transform 350ms cubic-bezier(.2,0,0,1),box-shadow 350ms,border-color 350ms;
        overflow:hidden; position:relative;
      }
      .glow-card:hover { transform:translateY(-6px); box-shadow:0 4px 8px 3px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.14),0 0 0 2px rgba(0,82,154,.12); border-color:rgba(0,82,154,.28); }

      /* ══ FLOATING ICON ORB ══ */
      .icon-float {
        width:56px; height:56px; border-radius:50%;
        background:linear-gradient(135deg,var(--md-primary-container) 0%,#D1E4FF 100%);
        display:flex; align-items:center; justify-content:center;
        color:var(--md-primary); box-shadow:var(--el-1); flex-shrink:0;
        transition:transform 300ms cubic-bezier(.2,0,0,1),box-shadow 300ms;
        animation: globalGlow 3s ease-in-out infinite;
      }
      .glow-card:hover .icon-float { transform:scale(1.12) rotate(-5deg); box-shadow:var(--el-2); }

      /* ══ STAT BOX ══ */
      .stat-box {
        display:flex; flex-direction:column; gap:.3rem;
        background:var(--md-surface-container); border-radius:var(--r-lg);
        padding:1.5rem 1.75rem; border-left:4px solid var(--md-primary);
        transition:background 300ms,transform 300ms cubic-bezier(.2,0,0,1);
        animation: borderPulse 4s ease-in-out infinite;
      }
      .stat-box:hover { background:var(--md-primary-container); transform:translateX(4px); animation:none; }
      .stat-box__value { font-size:2.2rem; font-weight:900; color:var(--md-primary); line-height:1; }
      .stat-box__unit  { font-size:.75rem; color:var(--md-primary); opacity:.7; font-weight:600; margin-left:.1rem; }
      .stat-box__label { font-size:.85rem; color:var(--md-on-surface-variant); line-height:1.45; margin-top:.25rem; }

      /* ══ M3 CHIP ══ */
      .m3-chip {
        display:inline-flex; align-items:center; gap:.4rem;
        padding:.3rem .85rem; border-radius:var(--r-full);
        border:1px solid var(--md-outline-variant); background:var(--md-surface);
        font-size:.78rem; font-weight:600; color:var(--md-on-surface-variant);
        transition:background 200ms,border-color 200ms,color 200ms,transform 200ms;
        cursor:default;
      }
      .m3-chip:hover { background:var(--md-primary-container); border-color:rgba(0,82,154,.3); color:var(--md-on-primary-container); transform:translateY(-2px); }

      /* ══ GLOBAL KEYFRAMES ══ */
      @keyframes globalGlow  { 0%,100%{box-shadow:var(--el-1)} 50%{box-shadow:0 4px 8px rgba(0,82,154,.22)} }
      @keyframes borderPulse { 0%,100%{border-left-color:var(--md-primary)} 50%{border-left-color:rgba(0,82,154,.5)} }
`;

code = code.replace(
  '      /* Stagger delays */\n      .stagger-1 { transition-delay: 80ms !important; }\n      .stagger-2 { transition-delay: 160ms !important; }\n      .stagger-3 { transition-delay: 240ms !important; }\n      .stagger-4 { transition-delay: 320ms !important; }',
  '      /* Stagger delays */\n      .stagger-1 { transition-delay: 80ms !important; }\n      .stagger-2 { transition-delay: 160ms !important; }\n      .stagger-3 { transition-delay: 240ms !important; }\n      .stagger-4 { transition-delay: 320ms !important; }' + toInsert
);

fs.writeFileSync('src/layouts/Layout.astro', code);
console.log('Layout.astro patched with M3 global animation classes!');
