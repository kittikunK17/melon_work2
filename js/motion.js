/* ตะวันฟาร์ม — เอฟเฟกต์เพิ่มเติม (GSAP + ScrollTrigger + Lenis)
   ถ้าโหลดไลบรารีไม่ได้ หรือผู้ใช้ปิดแอนิเมชัน เว็บจะทำงานแบบปกติ */
(function () {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* --- Lenis smooth scroll, driven by the GSAP ticker --- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    var dlg = document.getElementById('sheet');
    if (dlg) new MutationObserver(function () { dlg.hasAttribute('open') ? lenis.stop() : lenis.start(); })
      .observe(dlg, { attributes: true, attributeFilter: ['open'] });
  }

  /* --- scroll progress bar --- */
  var bar = document.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  ST.create({ start: 0, end: 'max', onUpdate: function (s) { bar.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')'; } });

  /* --- blur-up reveal for headings, staggered reveals for lists --- */
  var once = { start: 'top 85%', toggleActions: 'play none none none' };
  gsap.utils.toArray('.sec-head, .cut-copy h2, #visitTitle, #contactTitle').forEach(function (el) {
    gsap.from(el, { y: 36, opacity: 0, filter: 'blur(12px)', duration: 0.9, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: Object.assign({ trigger: el }, once) });
  });
  function stagger(sel, trigger, vars) {
    var els = gsap.utils.toArray(sel); if (!els.length) return;
    gsap.from(els, Object.assign({ y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity',
      scrollTrigger: Object.assign({ trigger: trigger }, once) }, vars || {}));
  }
  stagger('.panel', '#panels');
  stagger('.steps li', '.steps', { x: -30, y: 0 });
  stagger('.contact .wrap.split > *', '.contact', { y: 40 });
  gsap.from('.farm-photo', { clipPath: 'inset(12% 12% 12% 12% round 28px)', opacity: 0, duration: 1.2, ease: 'power3.out', clearProps: 'clipPath,opacity',
    scrollTrigger: Object.assign({ trigger: '.farm-photo' }, once) });

  /* --- marquee skews with scroll speed (like React Bits ScrollVelocity) --- */
  var rows = gsap.utils.toArray('.marquee-row');
  if (lenis && rows.length) {
    var skew = gsap.quickTo(rows, 'skewX', { duration: 0.4, ease: 'power3.out' });
    lenis.on('scroll', function (e) { skew(gsap.utils.clamp(-8, 8, -e.velocity * 0.35)); });
  }

  if (fine) {
    /* --- soft spotlight that follows the mouse on cards (21st.dev style) --- */
    document.querySelectorAll('.cut-item, .steps li').forEach(function (el) {
      el.classList.add('spot');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    /* --- magnetic main buttons --- */
    document.querySelectorAll('.btn-main:not(#dOrder)').forEach(function (b) {
      var x = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3.out' }), y = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3.out' });
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.2); y((e.clientY - r.top - r.height / 2) * 0.3);
      });
      b.addEventListener('pointerleave', function () { x(0); y(0); });
    });
  }

  window.addEventListener('load', function () { ST.refresh(); });
})();
