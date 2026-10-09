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

  // ---- Nav: top bar + full-screen menu panel ----
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var burger = nav.querySelector('.nav-hamburger');
    var panel = document.getElementById('nav-panel');
    var label = burger && burger.querySelector('.nav-menu-label');
    var setOpen = function (open, restoreFocus) {
      nav.classList.toggle('open', open);
      document.documentElement.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (label) label.textContent = open ? 'Close' : 'Menu';
      if (open && panel) {
        var first = panel.querySelector('a');
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 50);
      } else if (restoreFocus) {
        burger.focus();
      }
    };
    if (burger) {
      burger.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
      });
    }
    if (panel) {
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
      // click on the backdrop (not a link) closes the panel
      panel.addEventListener('click', function (e) { if (e.target === panel || e.target.classList.contains('nav-panel-inner')) setOpen(false, true); });
    }
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

  // Altitude product cards. opts.full shows Ben's whole story (tandem page);
  // otherwise the opening lines plus a link to the full story (homepage).
  DX.renderAltitudes = function (el, opts) {
    opts = opts || {};
    return DX.render(URL_T, el, function (t) {
      return (t.altitudes || []).map(function (a, i) {
        var story = a.story || [];
        var shown = opts.full ? story : story.slice(0, 2);
        var slug = 'alt-' + String(a.feet || i).replace(/[^0-9]/g, '');
        return '<article class="glass drop-card reveal reveal-d' + Math.min(i + 1, 3) + (a.popular ? ' glass--hi' : '') + '" id="' + slug + '">' +
          (a.image ? '<div class="drop-card-media"><img src="' + esc(a.image) + '" alt="' + esc(a.alt || '') + '" width="1200" height="800" loading="lazy" style="object-position:' + esc(a.image_pos || 'center') + '">' +
            '<h3 class="drop-card-name">' + esc(a.name || a.feet) + '</h3></div>' : '<h3 class="drop-card-name">' + esc(a.name || a.feet) + '</h3>') +
          (a.popular && a.note ? '<span class="alt-badge">' + esc(a.note) + '</span>' : '') +
          '<div class="drop-card-body">' +
            DX.phTag(a.placeholder) +
            '<span class="drop-label">The Drop</span>' +
            '<p class="drop-line">' + esc(a.tagline || '') + '</p>' +
            (a.headline ? '<p class="drop-headline">' + esc(a.headline) + '</p>' : '') +
            '<div class="story drop-story">' + DX.story(shown) + '</div>' +
            (!opts.full && story.length > shown.length ? '<a class="arrow-link drop-more" href="tandem.html#' + slug + '">Read the full story <span aria-hidden="true">→</span></a>' : '') +
            '<dl class="drop-facts">' +
              '<div><dt>Altitude</dt><dd>' + esc(a.feet) + '</dd></div>' +
              '<div><dt>Freefall</dt><dd>' + esc(String(a.freefall || '').replace(/ of freefall$/i, '')) + '</dd></div>' +
              '<div><dt>From</dt><dd>' + esc(a.price) + '</dd></div>' +
            '</dl>' +
            '<div class="btn-row drop-ctas">' +
              '<a href="contact.html?topic=tandem#enquire" class="amber-btn" data-book="tandem">Book ' + esc(a.name || a.feet) + ' <span aria-hidden="true">→</span></a>' +
              '<a href="contact.html?topic=voucher#enquire" class="arrow-link" data-book="vouchers">Give it as a gift <span aria-hidden="true">→</span></a>' +
            '</div>' +
          '</div>' +
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
