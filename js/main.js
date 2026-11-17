/* ตะวันฟาร์ม V2 — การทำงานของหน้าเว็บ
   ไม่ต้องแก้ไฟล์นี้ ข้อมูลทั้งหมดอยู่ใน js/content.js */
(function () {
  'use strict';
  var S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  document.documentElement.classList.add('js');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- illustrations used when a photo is missing ---------- */
  var melonArt = '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><pattern id="pn" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0H6M0 0V6" stroke="#F6EAD0" stroke-width="1" opacity=".7" fill="none"/></pattern></defs>' +
    '<circle cx="50" cy="50" r="46" fill="#8C9A5E"/><circle cx="50" cy="50" r="41" fill="#DCE3BE"/><circle cx="50" cy="50" r="36" fill="var(--flesh)"/><circle cx="50" cy="50" r="15" fill="#F6D29A"/>' +
    '<g fill="#F8EBD2" stroke="#C98A44" stroke-width=".8"><ellipse cx="50" cy="40" rx="2" ry="3.6"/><ellipse cx="59" cy="47" rx="2" ry="3.6" transform="rotate(70 59 47)"/><ellipse cx="56" cy="58" rx="2" ry="3.6" transform="rotate(140 56 58)"/><ellipse cx="44" cy="58" rx="2" ry="3.6" transform="rotate(-140 44 58)"/><ellipse cx="41" cy="47" rx="2" ry="3.6" transform="rotate(-70 41 47)"/></g></svg>';
  var farmArt = '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<rect width="400" height="500" fill="var(--sand)"/><circle cx="300" cy="110" r="52" fill="var(--gold)" opacity=".85"/>' +
    '<path d="M0 260Q200 210 400 260V500H0Z" fill="var(--rind)"/>' +
    '<g stroke="var(--band)" stroke-width="3" opacity=".3" fill="none"><path d="M0 310Q200 270 400 310M0 360Q200 325 400 360M0 415Q200 385 400 415M0 470Q200 445 400 470"/></g>' +
    '<g fill="#B9B07A" stroke="var(--band)" stroke-width="2"><circle cx="70" cy="300" r="15"/><circle cx="180" cy="345" r="18"/><circle cx="290" cy="310" r="14"/><circle cx="340" cy="400" r="19"/><circle cx="110" cy="410" r="17"/><circle cx="230" cy="455" r="18"/></g>' +
    '<g fill="var(--surface)" stroke="var(--band)" stroke-width="3"><path d="M36 250V190l60-36 60 36v60Z"/><path d="M78 250v-36h36v36" fill="var(--sand)"/></g></svg>';
  var mapArt = '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="#F7E9D3"/>' +
    '<rect x="30" y="30" width="90" height="70" rx="10" fill="#E3EBCB"/><rect x="270" y="190" width="100" height="80" rx="10" fill="#E3EBCB"/><rect x="250" y="30" width="70" height="60" rx="10" fill="#EFD9BA"/><rect x="40" y="200" width="80" height="70" rx="10" fill="#EFD9BA"/>' +
    '<g stroke="#FFFDF9" stroke-width="16" fill="none" stroke-linecap="round"><path d="M-10 150H410"/><path d="M200 -10V310"/><path d="M-10 40C120 70 280 230 410 250"/></g>' +
    '<path d="M200 168s-15-12.4-15-24a15 15 0 0 1 30 0c0 11.6-15 24-15 24z" fill="#A65E24"/><circle cx="200" cy="144" r="6" fill="#FFFDF9"/></svg>';
  var sliceIcon = '<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(-18 12 12) translate(0 2.5)">' +
    '<path d="M2.5 8.5A9.5 9.5 0 0 0 21.5 8.5Z" fill="#5F7F2E"/><path d="M4 8.5A8 8 0 0 0 20 8.5Z" fill="#EEF2D2"/>' +
    '<path d="M5.3 8.5A6.7 6.7 0 0 0 18.7 8.5Z" fill="#F7B267"/><path d="M8.6 8.5A3.4 3.4 0 0 0 15.4 8.5Z" fill="#FBD9A8"/>' +
    '<g fill="#5A3420"><ellipse cx="9.6" cy="10.4" rx=".8" ry="1.3" transform="rotate(-35 9.6 10.4)"/><ellipse cx="12" cy="11.3" rx=".8" ry="1.3"/><ellipse cx="14.4" cy="10.4" rx=".8" ry="1.3" transform="rotate(35 14.4 10.4)"/></g>' +
    '<path d="M2.5 8.5H21.5" stroke="#4A6324" stroke-width=".8"/></g></svg>';

  function photo(src, alt, fallback) {
    if (!src) return fallback;
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" data-fallback="1">';
  }
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img.tagName === 'IMG' && img.dataset.fallback) {
      var wrap = img.parentNode;
      wrap.innerHTML = wrap.id === 'farmPhoto' ? farmArt : melonArt;
    }
  }, true);

  /* ---------- language ---------- */
  var lang = 'th';
  try { lang = localStorage.getItem('tawan-lang') || ''; } catch (e) { lang = ''; }
  if (lang !== 'th' && lang !== 'en') lang = /^th/i.test(navigator.language || 'th') ? 'th' : 'en';
  var T = function (k) { return (S.text[lang] && S.text[lang][k]) || S.text.th[k] || ''; };
  var meta = {
    th: { title: 'เมลอนหนองคาย | ตะวันฟาร์ม บ้านตะวันรีสอร์ท', desc: 'ตะวันฟาร์ม เมลอนหนองคายปลูกเองทุกลูกที่บ้านตะวันรีสอร์ท สดจากสวน โทรสั่งหรือนัดชมสวนได้ที่ ' + S.phone },
    en: { title: 'Tawan Farm | Fresh Nong Khai Melons', desc: 'Tawan Farm grows every melon at Baan Tawan Resort, Nong Khai. Call ' + S.phone + ' to order or visit the farm.' }
  };

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = meta[lang].title;
    var d = document.querySelector('meta[name="description"]'); if (d) d.setAttribute('content', meta[lang].desc);
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.dataset.i18n); });
    var btn = $('lang');
    btn.textContent = lang === 'th' ? 'EN' : 'TH';
    btn.setAttribute('aria-label', lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย');
    $('nav').setAttribute('aria-label', lang === 'th' ? 'เมนูหลัก' : 'Main menu');
    $('addr').textContent = S.address[lang] || S.address.th;
    $('dClose').setAttribute('aria-label', T('close'));
    $('dPrev').setAttribute('aria-label', T('prev'));
    $('dNext').setAttribute('aria-label', T('next'));
    $('dTipLabel').textContent = T('tip') + ':';
    var fi = $('farmPhoto').querySelector('img'); if (fi) fi.alt = T('farm_alt');
    galText();
    renderPanels();
    renderMarquee();
    if (dlg.open) fillDialog(current);
    moveInd();
  }
  $('lang').addEventListener('click', function () {
    lang = lang === 'th' ? 'en' : 'th';
    try { localStorage.setItem('tawan-lang', lang); } catch (e) {}
    applyLang();
  });

  /* ---------- contact info ---------- */
  document.querySelectorAll('.js-phone').forEach(function (el) { el.textContent = S.phone; });
  document.querySelectorAll('.js-tel').forEach(function (el) { el.href = 'tel:' + S.phoneDial; });
  document.querySelectorAll('.js-map').forEach(function (el) { el.href = S.mapLink; });
  $('year').textContent = new Date().getFullYear();
  if (S.mapEmbed) {
    var q = encodeURIComponent('บ้านตะวันรีสอร์ท ' + S.address.th);
    $('map').innerHTML = '<iframe src="https://maps.google.com/maps?q=' + q + '&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + esc(T('map_title')) + '"></iframe>';
  } else {
    $('map').innerHTML = mapArt;
  }
  /* bouncing location pin over the map */
  var pinEl = document.createElement('div');
  pinEl.className = 'map-pin'; pinEl.setAttribute('aria-hidden', 'true');
  pinEl.innerHTML = '<span class="pulse"></span><span class="shadow"></span>' +
    '<svg class="pin" viewBox="0 0 40 52" width="40" height="52"><path d="M20 51s-17-15.5-17-29a17 17 0 0 1 34 0c0 13.5-17 29-17 29z" fill="var(--btn)" stroke="#FFFDF9" stroke-width="2.5"/><circle cx="20" cy="21" r="6.5" fill="#FFFDF9"/></svg>';
  $('map').appendChild(pinEl);
  $('farmPhoto').innerHTML = photo(S.farmPhoto, T('farm_alt'), farmArt);

  /* ---------- gallery: photos + videos (list lives in content.js) ---------- */
  var gal = (S.gallery || []).filter(function (g) { return g && (g.src || g.id); });
  var galGrid = $('galGrid'), galSec = $('gallery'), galLink = document.querySelector('nav a[href="#gallery"]');
  function galCheck() {
    var empty = !galGrid.querySelector('.gal-item:not(.wait)');
    if (galSec.hidden !== empty) {
      galSec.hidden = empty;
      if (galLink) galLink.hidden = empty;
      if (window.ScrollTrigger) setTimeout(function () { window.ScrollTrigger.refresh(); }, 50);
    }
  }
  galGrid.innerHTML = gal.map(function (g, i) {
    var body;
    if (g.type === 'video') {
      /* still preview + play button; tap to play, tap again to pause */
      body = '<div class="gal-vid"><video playsinline muted preload="metadata" src="' + esc(g.src) + (g.poster ? '' : '#t=0.1') + '"' + (g.poster ? ' poster="' + esc(g.poster) + '"' : '') + '></video>' +
        '<button class="gal-play" type="button"><svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path class="i-play" d="M8 5.5v13l11-6.5z" fill="currentColor"/><g class="i-pause" fill="currentColor"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></g></svg></button></div>';
    } else if (g.type === 'youtube') {
      body = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(g.id) + '" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    } else {
      body = '<button class="gal-open" type="button"><img src="' + esc(g.src) + '" alt="" decoding="async"></button>';
    }
    return '<figure class="gal-item ' + (g.type === 'youtube' ? 'gal-video' : g.type === 'video' ? 'gal-video tall' : 'gal-photo wait') + '" data-i="' + i + '">' + body + '<figcaption></figcaption></figure>';
  }).join('');
  /* items show once their file loads; a file that isn't there yet just stays out of the grid */
  function galReady(e) {
    if (e.target.tagName !== 'IMG' && e.target.tagName !== 'VIDEO') return;   /* ignore svg icon load events */
    var f = e.target.closest('.gal-item');
    if (f && f.classList.contains('wait')) {
      var t = e.target, w = t.videoWidth || t.naturalWidth, h = t.videoHeight || t.naturalHeight;
      if (h > w * 1.1) f.classList.add('tall');   /* phone-shot (vertical) photo or video */
      f.classList.remove('wait'); galCheck();
    }
  }
  galGrid.addEventListener('load', galReady, true);
  /* videos show straight away (iPhones don't preload them); fix the shape once the size is known */
  galGrid.addEventListener('loadedmetadata', function (e) {
    var v = e.target, f = v.closest('.gal-item');
    if (f && v.videoWidth) f.classList.toggle('tall', v.videoHeight > v.videoWidth * 1.1);
  }, true);
  galGrid.addEventListener('error', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' || t.tagName === 'VIDEO') {
      var f = t.closest('.gal-item'); if (f) { f.remove(); galCheck(); }
    }
  }, true);
  galCheck();
  function galText() {
    galGrid.querySelectorAll('.gal-item').forEach(function (f) {
      var g = gal[+f.dataset.i], cap = g[lang] || g.th || '';
      var label = cap || T(g.type === 'photo' || !g.type ? 'gallery_alt' : 'gallery_video');
      var img = f.querySelector('img'); if (img) img.alt = label;
      var v = f.querySelector('video, iframe'); if (v) { v.setAttribute('aria-label', label); v.title = label; }
      var pb = f.querySelector('.gal-play'); if (pb) pb.setAttribute('aria-label', (f.querySelector('.playing') ? (lang === 'th' ? 'หยุดวิดีโอ' : 'Pause video') : (lang === 'th' ? 'เล่นวิดีโอ' : 'Play video')) + ': ' + label);
      var fc = f.querySelector('figcaption'); fc.textContent = cap; fc.hidden = !cap;
    });
  }

  /* phones: tiles are small, so photos and videos open in a big viewer instead */
  var small = function () { return window.innerWidth <= 860; };

  /* video preview: tap to play / pause inline (computers); on phones it opens in the viewer */
  galGrid.addEventListener('click', function (e) {
    var w = e.target.closest('.gal-vid'); if (!w) return;
    var v = w.querySelector('video');
    if (small()) {
      v.pause();
      var f = w.closest('.gal-item');
      openLb('video', v.getAttribute('src'), v.getAttribute('aria-label') || '', f.querySelector('figcaption').textContent, v.getAttribute('poster'), w.querySelector('.gal-play'));
      return;
    }
    if (v.paused) {
      galGrid.querySelectorAll('video').forEach(function (o) { if (o !== v) o.pause(); });
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    } else v.pause();
  });
  ['play', 'pause', 'ended'].forEach(function (ev) {
    galGrid.addEventListener(ev, function (e) {
      var w = e.target.closest('.gal-vid'); if (!w) return;
      var on = !e.target.paused && !e.target.ended;
      w.classList.toggle('playing', on);
      w.querySelector('.gal-play').setAttribute('aria-label', on ? (lang === 'th' ? 'หยุดวิดีโอ' : 'Pause video') : (lang === 'th' ? 'เล่นวิดีโอ' : 'Play video'));
    }, true);
  });

  /* viewer (photos + videos). Closes with the big X, a tap on the dark area, Esc, or the phone's Back button/gesture */
  var lb = $('lightbox'), lbImg = $('lbImg'), lbVid = $('lbVid'), lbOpener = null, lbPushed = false;
  function openLb(kind, src, alt, cap, poster, opener) {
    lbOpener = opener;
    lb.classList.toggle('is-video', kind === 'video');
    if (kind === 'video') {
      lbImg.removeAttribute('src'); lbImg.hidden = true;
      lbVid.hidden = false;
      if (poster) lbVid.setAttribute('poster', poster); else lbVid.removeAttribute('poster');
      lbVid.src = src; lbVid.setAttribute('aria-label', alt);
    } else {
      lbVid.pause(); lbVid.removeAttribute('src'); lbVid.hidden = true;
      lbImg.hidden = false; lbImg.src = src; lbImg.alt = alt;
    }
    $('lbCap').textContent = cap || ''; $('lbCap').hidden = !cap;
    $('lbClose').setAttribute('aria-label', T('close'));
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    if (kind === 'video') { var pr = lbVid.play(); if (pr && pr.catch) pr.catch(function () {}); }
    /* an extra history step, so the phone's Back closes the viewer instead of leaving the site */
    if (!lbPushed) { try { history.pushState({ tawanLb: 1 }, ''); lbPushed = true; } catch (err) {} }
  }
  function stopLbVideo() { lbVid.pause(); if (lbVid.hasAttribute('src')) { lbVid.removeAttribute('src'); try { lbVid.load(); } catch (err) {} } }
  function closeLb() {
    stopLbVideo();
    if (lb.close) { if (lb.open) lb.close(); } else { lb.removeAttribute('open'); lb.dispatchEvent(new Event('close')); }
  }
  lb.addEventListener('close', function () {
    stopLbVideo();
    document.body.style.overflow = '';
    if (lbOpener && document.contains(lbOpener)) lbOpener.focus({ preventScroll: true });
    if (lbPushed) { lbPushed = false; if (history.state && history.state.tawanLb) history.back(); }
  });
  window.addEventListener('popstate', function () { if (lbPushed) { lbPushed = false; closeLb(); } });
  $('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) closeLb(); });

  galGrid.addEventListener('click', function (e) {
    var b = e.target.closest('.gal-open'); if (!b) return;
    var img = b.querySelector('img'), f = b.closest('.gal-item');
    openLb('photo', img.src, img.alt, f.querySelector('figcaption').textContent, '', b);
  });

  /* ---------- marquee (two rows) ---------- */
  function renderMarquee() {
    var items = (S.text[lang] && S.text[lang].marquee) || S.text.th.marquee || [];
    var row = function (list) {
      var half = '';
      for (var r = 0; r < 2; r++) half += list.map(function (t) { return '<span class="marquee-item">' + esc(t) + sliceIcon + '</span>'; }).join('');
      return half + half;
    };
    $('marqueeA').innerHTML = row(items);
    $('marqueeB').innerHTML = row(items.slice().reverse());
  }

  /* ---------- variety panels ---------- */
  var N = S.melons.length, panels = $('panels'), openIdx = 0;
  function info(i) { var m = S.melons[i]; return m[lang] && m[lang].name ? m[lang] : (m.th || {}); }
  function nameOf(i) { return info(i).name || (T('variety') + ' ' + (i + 1)); }

  function renderPanels() {
    panels.innerHTML = S.melons.map(function (m, i) {
      var x = info(i);
      var chips = [x.flesh, x.taste, x.season].filter(Boolean);
      return '<article class="panel' + (i === openIdx ? ' is-open' : '') + '" data-i="' + i + '">' +
        '<div class="media">' + photo(m.photo, T('melon_alt') + ' ' + nameOf(i), melonArt) + '</div>' +
        '<span class="num">' + (i + 1) + ' / ' + N + '</span>' +
        '<span class="vname" aria-hidden="true">' + esc(nameOf(i)) + '</span>' +
        '<button class="hit" type="button" aria-label="' + esc(nameOf(i)) + '" aria-expanded="' + (i === openIdx) + '"></button>' +
        '<div class="info"><h3>' + esc(nameOf(i)) + '</h3><p>' + esc(x.short || T('coming')) + '</p>' +
        (chips.length ? '<ul class="chips">' + chips.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '<div style="height:14px"></div>') +
        '<button class="btn more" type="button" data-i="' + i + '">' + T('more') + '</button></div></article>';
    }).join('');
  }
  function openPanel(i) {
    if (i === openIdx) return;
    openIdx = i;
    [].forEach.call(panels.children, function (p, k) {
      p.classList.toggle('is-open', k === i);
      p.querySelector('.hit').setAttribute('aria-expanded', k === i ? 'true' : 'false');
    });
  }
  panels.addEventListener('click', function (e) {
    var more = e.target.closest('.more');
    if (more) { openMelon(+more.dataset.i, more); return; }
    var p = e.target.closest('.panel'); if (p) openPanel(+p.dataset.i);
  });
  if (finePointer) panels.addEventListener('mouseover', function (e) { var p = e.target.closest('.panel'); if (p) openPanel(+p.dataset.i); });
  panels.addEventListener('focusin', function (e) { var p = e.target.closest('.panel'); if (p) openPanel(+p.dataset.i); });

  /* ---------- detail dialog ---------- */
  var dlg = $('sheet'), opener = null, current = 0;
  function fillDialog(i) {
    current = i;
    var m = S.melons[i], x = info(i);
    $('dArt').innerHTML = photo(m.photo, T('melon_alt') + ' ' + nameOf(i), melonArt);
    $('dKick').textContent = T('variety') + ' ' + (i + 1) + ' ' + T('of') + ' ' + N;
    $('dName').textContent = nameOf(i);
    $('dLong').textContent = x.long || x.short || T('coming');
    var rows = ['flesh', 'taste', 'sweet', 'weight', 'season'].filter(function (k) { return x[k]; });
    $('dFacts').innerHTML = rows.map(function (k) { return '<dt>' + T(k) + '</dt><dd>' + esc(x[k]) + '</dd>'; }).join('');
    $('dFacts').hidden = !rows.length;
    $('dTip').textContent = x.tip || '';
    $('dTipWrap').hidden = !x.tip;
  }
  function openMelon(i, btn) {
    opener = btn; fillDialog(i);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function closeMelon() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); document.body.style.overflow = ''; }
  dlg.addEventListener('close', function () { document.body.style.overflow = ''; if (opener && document.contains(opener)) opener.focus(); });
  $('dClose').addEventListener('click', closeMelon);
  $('dOrder').addEventListener('click', function (e) {
    e.preventDefault(); opener = null; closeMelon();
    var c = $('contact'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('dPrev').addEventListener('click', function () { fillDialog((current - 1 + N) % N); openPanel(current); });
  $('dNext').addEventListener('click', function () { fillDialog((current + 1) % N); openPanel(current); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeMelon(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') $('dNext').click();
    if (e.key === 'ArrowLeft') $('dPrev').click();
  });

  /* ---------- floating header: hide on scroll down, show on scroll up ---------- */
  var hdr = $('hdr'), nav = $('nav'), menuBtn = $('menuBtn'), lastY = window.scrollY;
  function setMenu(open) { nav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
  hdr.addEventListener('focusin', function () { hdr.classList.remove('away'); });

  /* sliding indicator under the current menu item */
  var ind = $('navInd');
  function moveInd() {
    var a = nav.querySelector('a[aria-current="true"]');
    if (!a || !a.offsetWidth) { ind.classList.remove('on'); return; }
    ind.style.left = a.offsetLeft + 'px';
    ind.style.width = a.offsetWidth + 'px';
    ind.classList.add('on');
  }
  window.addEventListener('resize', moveInd);

  /* ---------- scroll-driven effects ---------- */
  var cut = $('cut'), halfL = $('halfL'), halfR = $('halfR'), face = $('cutFace'), bar = $('cutBar');
  var items = document.querySelectorAll('.cut-item');
  var farm = $('farmPhoto');
  var seeds = $('cutSeeds'), sh = '';
  for (var k = 0; k < 12; k++) {
    var a = k * 30, r = a * Math.PI / 180, cx = (150 + Math.sin(r) * 30).toFixed(1), cy = (150 - Math.cos(r) * 30).toFixed(1);
    sh += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="4" ry="8" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"/>';
  }
  seeds.innerHTML = sh;

  /* the scroll effect needs a normal browser window; inside previews that grow to the page height, show the opened melon instead */
  var staticCut = function () { return reduce || window.innerWidth <= 860 || window.innerHeight >= 1300; };
  var lastOn = -1, lastP = -1, cutArt = cut.querySelector('.cut-art'), navReset = false, lastFarm = '';
  function setCut(p, noHi) {
    if (p === lastP) return;   /* nothing changed: skip the style writes */
    lastP = p;
    var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    halfL.style.transform = 'translateX(' + (-e * 70) + 'px) rotate(' + (-e * 16) + 'deg)';
    halfR.style.transform = 'translateX(' + (e * 70) + 'px) rotate(' + (e * 16) + 'deg)';
    face.style.transform = 'scale(' + (0.6 + e * 0.42) + ')';
    bar.style.width = (p * 100) + '%';
    var on = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
    if (!noHi && on !== lastOn) { lastOn = on; items.forEach(function (it, i) { it.classList.toggle('on', i === on); }); }
  }
  /* all layout reads happen first, then all writes, so the browser lays the page out only once per frame (big win on phones) */
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight, vw = window.innerWidth;
    var phone = !reduce && vw <= 860, still = !phone && staticCut();
    /* ---- reads ---- */
    var rc = null, mids = null, rect = null, fr = null;
    if (phone) {
      rc = cutArt.getBoundingClientRect();
      var cr = cut.getBoundingClientRect();
      if (cr.bottom > -vh * 0.5 && cr.top < vh * 1.5) mids = [].map.call(items, function (it) { var r = it.getBoundingClientRect(); return r.top + r.height / 2; });
    } else if (!still) rect = cut.getBoundingClientRect();
    if (!reduce && farm.firstElementChild) { fr = farm.getBoundingClientRect(); if (fr.bottom < -vh || fr.top > vh * 2) fr = null; }

    /* ---- writes ---- */
    if (y > 160 && y > lastY + 4 && !nav.classList.contains('open')) hdr.classList.add('away');
    else if (y < lastY - 4 || y <= 160) hdr.classList.remove('away');
    lastY = y;
    if (y < 200) { if (!navReset) { navReset = true; nav.querySelectorAll('a').forEach(function (a) { a.setAttribute('aria-current', 'false'); }); moveInd(); } }
    else navReset = false;

    if (phone) {
      /* phones: no pinning — the melon opens and the points light up as the section scrolls past */
      if (!cut.classList.contains('live')) cut.classList.add('live');
      /* starts opening as soon as the melon peeks in, fully open by the time it reaches the middle of the screen */
      var pp = Math.min(1, Math.max(0, (vh * 0.95 - rc.top) / (vh * 0.55)));
      setCut(Math.round(pp * (vw <= 600 ? 0.45 : 0.7) * 1000) / 1000, true);
      if (mids) {
        /* light up the point that's closest to the middle of the screen */
        var onM = 0, best = Infinity;
        mids.forEach(function (m, i) { var d = Math.abs(m - vh * 0.55); if (d < best) { best = d; onM = i; } });
        if (onM !== lastOn) { lastOn = onM; items.forEach(function (it, i) { it.classList.toggle('on', i === onM); }); }
      }
    }
    else if (still) { cut.classList.remove('live'); setCut(vw <= 600 ? 0.45 : 0.7); if (lastOn !== -2) { lastOn = -2; items.forEach(function (it) { it.classList.remove('on'); }); } }
    else {
      /* starts opening while the section scrolls in (not only once it's pinned), and finishes with a short hold before the section leaves */
      var from = vh * 0.6, to = -(rect.height - vh) * 0.8;
      var p = Math.min(1, Math.max(0, (from - rect.top) / (from - to)));
      setCut(p);
    }
    if (fr) {
      var tf = 'translateY(' + (-7 + (fr.top + fr.height / 2 - vh / 2) / vh * 10).toFixed(2) + '%)';
      if (tf !== lastFarm) { lastFarm = tf; farm.firstElementChild.style.transform = tf; }
    }
  }
  /* in-page links: one short eased scroll (about 0.6s) instead of the browser's long smooth scroll across the tall pinned section; animations pause meanwhile so it stays smooth */
  var root = document.documentElement, jumping = false;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.id === 'dOrder' || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var id = a.getAttribute('href').slice(1), t = id ? document.getElementById(id) : null;
    if (!t || jumping) return;
    e.preventDefault();
    var pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    var from = window.scrollY, to = Math.max(0, Math.round(t.getBoundingClientRect().top + from - (id === 'top' ? 0 : pad)));
    try { history.replaceState(null, '', '#' + id); } catch (_) {}
    if (reduce || Math.abs(to - from) < 4) { window.scrollTo({ top: to, behavior: 'instant' }); return; }
    jumping = true; root.classList.add('is-jumping');
    var fin = function () { jumping = false; root.classList.remove('is-jumping'); };
    if (window.__lenis) { window.__lenis.scrollTo(to, { duration: 1.1, onComplete: fin }); return; }
    var t0 = performance.now(), dur = 650;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      window.scrollTo({ top: from + (to - from) * ease, behavior: 'instant' });
      if (k < 1) requestAnimationFrame(step); else fin();
    })(t0);
  });

  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  if ('IntersectionObserver' in window) {
    var links = nav.querySelectorAll('a');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false'); }); moveInd(); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['varieties', 'visit', 'gallery', 'contact'].forEach(function (id) { io.observe($(id)); });
    var callbar = document.querySelector('.callbar');
    new IntersectionObserver(function (es) { callbar.classList.toggle('hide', es[0].isIntersecting); }, { threshold: 0.2 }).observe($('contact'));
    var wm = document.querySelector('.wordmark');
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) wm.classList.add('lit'); }, { threshold: 0.6 }).observe(wm);
  }

  /* ---------- pointer effects (mouse only) ---------- */
  if (finePointer && !reduce) {
    var art = $('heroArt'), layers = art.querySelectorAll('.layer'), depth = [10, 22, 36];
    document.querySelector('.hero').addEventListener('pointermove', function (e) {
      var r = art.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
      layers.forEach(function (l, i) { l.style.transform = 'translate(' + (x * depth[i]).toFixed(1) + 'px,' + (y * depth[i]).toFixed(1) + 'px)'; });
    });
    var mag = document.querySelector('.magnetic');
    mag.addEventListener('pointermove', function (e) {
      var r = mag.getBoundingClientRect();
      mag.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px)';
    });
    mag.addEventListener('pointerleave', function () { mag.style.transform = ''; });
  }

  /* ---------- copy phone number ---------- */
  var msg = $('copied');
  $('copy').addEventListener('click', function () {
    var done = function () { msg.textContent = T('copied'); setTimeout(function () { msg.textContent = ''; }, 2500); };
    var fallback = function () {
      var rg = document.createRange(); rg.selectNodeContents(document.querySelector('.big-num'));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); msg.textContent = T('copy_fail');
    };
    try { navigator.clipboard.writeText(S.phone).then(done, fallback); } catch (e) { fallback(); }
  });

  applyLang();
  onScroll();
})();
