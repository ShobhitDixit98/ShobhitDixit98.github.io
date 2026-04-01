/**
 * Custom Square Cursor — lu-works style
 * Uses mix-blend-mode: difference → the white square inverts any
 * background it hovers over (white on dark, black on light).
 * Smooth lerp follow. Scales up on interactive elements.
 */
(function () {
  'use strict';

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let tx = -100, ty = -100;
  let cx = -100, cy = -100;
  const LERP   = 0.12;
  let hovering = false;
  let hidden   = false;

  /* ── Track mouse ──────────────────────────────────────── */
  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    if (hidden) { cursor.style.opacity = '1'; hidden = false; }
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    hidden = true;
  });

  /* ── Hover targets ────────────────────────────────────── */
  const SEL = 'a, button, [data-cursor-hover], input, textarea, label, .work-card, .hero-role, .nav-brand, .stat-item';

  function attach(el) {
    el.addEventListener('mouseenter', () => { hovering = true; });
    el.addEventListener('mouseleave', () => { hovering = false; });
  }

  document.querySelectorAll(SEL).forEach(attach);

  new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      if (n.matches?.(SEL))          attach(n);
      n.querySelectorAll?.(SEL).forEach(attach);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  /* ── Click ripple ─────────────────────────────────────── */
  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-click'));

  /* ── Animation loop ───────────────────────────────────── */
  function loop() {
    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;

    const size = hovering ? 26 : 10;
    cursor.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
    cursor.style.width     = size + 'px';
    cursor.style.height    = size + 'px';

    requestAnimationFrame(loop);
  }
  loop();
})();
