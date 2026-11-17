/* Stonnex site script: menu behaviour, lead forms, CRM hand-off. Loaded with defer on every page. */
(function () {
  'use strict';

  /* ---- Keep ad click ids for the session so a lead on any page stays attributed ---- */
  try {
    var qs = new URLSearchParams(location.search);
    ['gclid', 'fbclid'].forEach(function (k) {
      var v = qs.get(k);
      if (v) sessionStorage.setItem('sx_' + k, v);
    });
  } catch (e) {}

  /* ---- Menu ---- */
  var nav = document.querySelector('nav.sxn');
  if (nav) {
    var burger = nav.querySelector('.sxn-burger');
    var groups = nav.querySelectorAll('.sxn-has');
    var closeGroups = function (except) {
      groups.forEach(function (g) {
        if (g !== except) {
          g.classList.remove('open');
          var b = g.querySelector('.sxn-top');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
    };
    var closeAll = function () {
      nav.classList.remove('open');
      if (burger) {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      }
      closeGroups(null);
    };
    if (burger) {
      burger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (!open) closeGroups(null);
      });
    }
    groups.forEach(function (g) {
      var b = g.querySelector('.sxn-top');
      if (!b) return;
      b.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = !g.classList.contains('open');
        closeGroups(g);
        g.classList.toggle('open', open);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
    nav.querySelectorAll('.sxn-menu a').forEach(function (a) {
      a.addEventListener('click', closeAll);
    });
  }

  /* ---- Lead forms ---- */
  var INTAKE = 'https://stonnex-lead-intake.netlify.app/lead';
  var HOME_FORMS = { 'hero-lead-form': 1, 'stonnex-contact-form': 1 }; /* these already post to the CRM themselves */

  function sendToCrm(form) {
    try {
      var d = new FormData(form);
      var q = new URLSearchParams(location.search);
      var name = (d.get('name') || ((d.get('first_name') || '') + ' ' + (d.get('last_name') || ''))).trim();
      var body = {
        name: name,
        phone: d.get('phone') || '',
        email: d.get('email') || '',
        address: d.get('address') || '',
        service: d.get('service') || d.get('service_interest') || '',
        message: d.get('message') || '',
        page: location.pathname + location.search,
        gclid: q.get('gclid') || sessionStorage.getItem('sx_gclid') || '',
        fbclid: q.get('fbclid') || sessionStorage.getItem('sx_fbclid') || '',
        company_website: d.get('_gotcha') || ''
      };
      fetch(INTAKE, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  /* Every enquiry form on the site also lands in the pipeline. Runs before the
     page's own handler, never blocks it, and never touches the email notification. */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.action || f.action.indexOf('formspree.io') === -1) return;
    if (HOME_FORMS[f.id]) return;
    if (typeof f.checkValidity === 'function' && !f.checkValidity()) return;
    sendToCrm(f);
  }, true);

  /* Forms added by the shared lead block */
  document.querySelectorAll('form.sx-lead-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      var note = form.querySelector('.sxl-error');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      if (note) note.hidden = true;
      var fail = function () {
        btn.disabled = false;
        btn.textContent = orig;
        if (note) note.hidden = false;
      };
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) { if (res.ok) { window.location.href = '/thankyou'; } else { fail(); } })
        .catch(fail);
    });
  });
})();

/* ---- Long card text on phones: three lines, with a "Read more" control ---- */
(function () {
  if (!window.matchMedia || !window.matchMedia('(max-width:768px)').matches) return;
  document.querySelectorAll('.sx-clamp').forEach(function (el) {
    if (el.scrollHeight <= el.clientHeight + 4) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'sx-more';
    b.textContent = 'Read more';
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', function () {
      var open = el.classList.toggle('sx-open');
      b.textContent = open ? 'Show less' : 'Read more';
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    el.insertAdjacentElement('afterend', b);
  });
})();

/* ---- Menu: mark the page you are on ---- */
(function () {
  var nav = document.querySelector('nav.sxn');
  if (!nav) return;
  var here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  nav.querySelectorAll('.sxn-menu a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '/' || href.indexOf('#') !== -1) return;
    var p = href.replace(/\/$/, '') || '/';
    if (p !== here && p !== here + '.html' && p + '.html' !== here) return;
    a.classList.add('sxn-current');
    a.setAttribute('aria-current', 'page');
    var group = a.closest('.sxn-has');
    if (group) { var top = group.querySelector('.sxn-top'); if (top) top.classList.add('sxn-current'); }
  });
})();

/* ---- Instant quote: offer a booking time once the visitor has their price ----
   The Roofle quote tool reports its steps to this page. When it reports that the
   visitor has submitted their details, show a small card linking to the booking page. */
(function () {
  var BOOK = 'https://book.stonnexcrm.com/?src=instant-quote';
  var shown = false;
  function track(name) { try { (window.dataLayer = window.dataLayer || []).push({ event: name, booking_source: 'instant_quote' }); } catch (e) {} }
  function show() {
    if (shown || document.getElementById('sxq')) return;
    shown = true;
    var css = document.createElement('style');
    css.textContent = '#sxq{position:fixed;left:20px;bottom:20px;z-index:2147483600;width:360px;max-width:calc(100vw - 28px);background:#1e2530;color:#fff;border:1px solid rgba(196,154,88,.45);border-radius:4px;box-shadow:0 18px 50px rgba(0,0,0,.35);padding:22px 22px 20px;font-family:Inter,system-ui,-apple-system,sans-serif;transform:translateY(16px);opacity:0;transition:opacity .35s,transform .35s}' +
      '#sxq.in{opacity:1;transform:none}' +
      '#sxq .sxq-e{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#c49a58;font-weight:500;margin:0 0 8px}' +
      '#sxq .sxq-h{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;line-height:1.15;font-weight:400;margin:0 0 10px;color:#fff}' +
      '#sxq .sxq-p{font-size:14.5px;line-height:1.6;color:rgba(255,255,255,.78);margin:0 0 16px}' +
      '#sxq .sxq-b{display:block;text-align:center;background:#a0793d;color:#fff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:14px 12px;border-radius:3px}' +
      '#sxq .sxq-b:hover{background:#c49a58}' +
      '#sxq .sxq-x{position:absolute;top:6px;right:8px;width:36px;height:36px;background:none;border:0;color:rgba(255,255,255,.6);font-size:22px;line-height:1;cursor:pointer}' +
      '#sxq .sxq-n{display:block;margin:12px auto 0;background:none;border:0;color:rgba(255,255,255,.6);font:inherit;font-size:13px;cursor:pointer;text-decoration:underline}' +
      '@media (max-width:768px){#sxq{left:14px;right:14px;width:auto;bottom:76px;padding:18px 18px 16px}#sxq .sxq-h{font-size:23px}}';
    document.head.appendChild(css);
    var d = document.createElement('div');
    d.id = 'sxq'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Book a roof inspection');
    d.innerHTML = '<button type="button" class="sxq-x" aria-label="Close">&times;</button>' +
      '<p class="sxq-e">Next step</p>' +
      '<p class="sxq-h">Get a firm written price</p>' +
      '<p class="sxq-p">Your estimate is a starting point. Book a free 20 to 30 minute inspection and we will measure the roof and confirm the price in writing.</p>' +
      '<a class="sxq-b" href="' + BOOK + '" target="_blank" rel="noopener">Choose a Time</a>' +
      '<button type="button" class="sxq-n">Not now</button>';
    document.body.appendChild(d);
    var close = function () { d.classList.remove('in'); setTimeout(function () { d.remove(); }, 400); };
    d.querySelector('.sxq-x').addEventListener('click', close);
    d.querySelector('.sxq-n').addEventListener('click', close);
    d.querySelector('.sxq-b').addEventListener('click', function () { track('sx_booking_click'); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add('in'); }); });
    track('sx_booking_prompt_shown');
  }
  window.addEventListener('message', function (e) {
    if (!e.origin || e.origin.indexOf('app.roofle.com') === -1) return;
    var data = e.data;
    if (typeof data === 'string') { try { data = JSON.parse(data); } catch (x) { return; } }
    if (!data || !data.event) return;
    if (data.event === 'Contact-form-submitted') setTimeout(show, 12000);
    if (data.event === 'Product-requested-cta') setTimeout(show, 1500);
  });
  if (/[?&]sxq-preview=1/.test(location.search)) setTimeout(show, 600);
})();
