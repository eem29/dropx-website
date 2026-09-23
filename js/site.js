// Skydive DropX: shared behaviour.
// Nav, scroll reveal, mobile scroll hint, JSON loading, and Book button wiring.
// Every Book / voucher / AFF link carries data-book="tandem|vouchers|aff" and a
// working fallback href. The real link comes from content/site.json → booking.
(function () {
  'use strict';

  var DX = window.DX = {};

  // ---- JSON loading (cached per URL) ----
  var cache = {};
  DX.load = function (url) {
    if (!cache[url]) {
      cache[url] = fetch(url, { cache: 'no-cache' }).then(function (res) {
        if (!res.ok) throw new Error(url + ' ' + res.status);
        return res.json();
      });
    }
    return cache[url];
  };

  DX.esc = function (str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  DX.phTag = function (flag) {
    return flag ? '<span class="ph-tag">Placeholder</span>' : '';
  };

  // Render into a container, or leave its hard-coded fallback content in place.
  DX.render = function (url, el, fn) {
    if (!el) return Promise.resolve();
    return DX.load(url).then(function (data) {
      var html = fn(data);
      if (html != null) el.innerHTML = html;
      DX.observeReveals(el);
      DX.wireBooking(el);
    }).catch(function (err) {
      console.warn('DropX content fallback:', err);
    });
  };

  // ---- Nav ----
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var burger = nav.querySelector('.nav-hamburger');
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    if (burger) {
      burger.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('touchstart', function () { a.classList.add('is-pressed'); }, { passive: true });
      a.addEventListener('touchend', function () { a.classList.remove('is-pressed'); });
      a.addEventListener('touchcancel', function () { a.classList.remove('is-pressed'); });
      a.addEventListener('click', function () { if (burger) setOpen(false); });
    });
  }

  // ---- Scroll reveal ----
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 }) : null;
  DX.observeReveals = function (root) {
    (root || document).querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('is-visible');
    });
  };
  DX.observeReveals(document);

  // ---- Mobile scroll hint ----
  var hint = document.querySelector('.hero-scroll-hint');
  if (hint) {
    var hide = function () {
      if (window.scrollY > 30) { hint.classList.add('is-hidden'); window.removeEventListener('scroll', hide); }
    };
    window.addEventListener('scroll', hide, { passive: true });
  }

  // ---- Book links from site.json ----
  var KEYS = { tandem: 'tandem_url', vouchers: 'vouchers_url', aff: 'aff_url' };
  DX.wireBooking = function (root) {
    return DX.load('/content/site.json').then(function (site) {
      var b = site.booking || {};
      (root || document).querySelectorAll('[data-book]').forEach(function (a) {
        var url = b[KEYS[a.getAttribute('data-book')]];
        if (!url) return;
        a.setAttribute('href', url);
        if (/^https?:\/\//.test(url) && url.indexOf(location.host) === -1) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener');
        }
      });
    }).catch(function () { /* keep fallback hrefs */ });
  };
  DX.wireBooking(document);
})();
