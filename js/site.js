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

// ---- Shared renderers for tandem content (homepage + tandem page) ----
(function () {
  'use strict';
  var DX = window.DX, esc = DX.esc, URL_T = '/content/tandem.json';

  // Story copy: short lines become display-font "beats", longer ones body paragraphs
  DX.story = function (paras) {
    return (paras || []).map(function (p) {
      return '<p class="' + (p.length <= 75 ? 'story-beat' : 'story-p') + '">' + esc(p) + '</p>';
    }).join('');
  };

  DX.renderAltitudes = function (el) {
    return DX.render(URL_T, el, function (t) {
      return (t.altitudes || []).map(function (a, i) {
        return '<article class="glass alt-card reveal reveal-d' + Math.min(i + 1, 3) + (a.popular ? ' glass--hi' : '') + '">' +
          (a.popular && a.note ? '<span class="alt-badge">' + esc(a.note) + '</span>' : '') +
          DX.phTag(a.placeholder) +
          '<span class="card-kicker">' + esc(a.feet) + ' tandem</span>' +
          '<h3 class="card-title">' + esc(a.name || a.feet) + '</h3>' +
          '<p class="alt-freefall">' + esc(a.tagline || a.freefall) + '</p>' +
          '<p class="card-price"><small>From</small>' + esc(a.price) + '</p>' +
          '<a href="contact.html?topic=tandem#enquire" class="amber-btn" data-book="tandem">Book ' + esc(a.name || a.feet) + '</a>' +
        '</article>';
      }).join('');
    });
  };

  DX.renderMediaRows = function (el, introEl) {
    return DX.render(URL_T, el, function (t) {
      var m = t.media || {};
      if (introEl && m.intro) introEl.textContent = m.intro;
      return (m.packages || []).map(function (p, i) {
        return '<li class="glass media-row reveal reveal-d' + Math.min(i + 1, 3) + (p.popular ? ' glass--hi' : '') + '">' +
          '<span><span class="media-row-name">' + esc(p.name) + '</span><span class="media-row-tag">' + esc(p.tag) + '</span></span>' +
          '<span class="card-price">' + (p.placeholder ? '<span class="ph-tag" style="margin:0 0.6rem 0 0">Placeholder</span>' : '') + esc(p.price) + '</span>' +
        '</li>';
      }).join('');
    });
  };

  DX.renderDay = function (el, durationEl) {
    return DX.render(URL_T, el, function (t) {
      var d = t.day || {};
      if (durationEl && d.duration) durationEl.innerHTML = esc(d.duration) + '.' + (d.placeholder ? ' ' + DX.phTag(true) : '');
      return (d.steps || []).map(function (s, i) {
        return '<li class="day-tile">' +
          '<img src="' + esc(s.image) + '" alt="' + esc(s.alt) + '" width="800" height="533" loading="lazy">' +
          '<div class="day-tile-text"><span class="day-num">0' + (i + 1) + '</span>' +
          '<h3 class="day-title">' + esc(s.title) + '</h3>' +
          '<p class="day-body">' + esc(s.body) + '</p></div>' +
        '</li>';
      }).join('');
    });
  };
})();
