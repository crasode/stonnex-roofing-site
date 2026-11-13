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
