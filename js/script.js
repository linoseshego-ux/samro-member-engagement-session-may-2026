(function () {
  'use strict';

  /* ── Mobile nav ─────────────────────────────────── */
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('mobileNav');
  var open = false;

  btn.addEventListener('click', function () {
    open = !open;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('.mnav-link').forEach(function (a) {
    a.addEventListener('click', function () {
      open = false;
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Contact form ───────────────────────────────── */
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var reset   = document.getElementById('formReset');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name     = document.getElementById('f-name').value.trim();
    var email    = document.getElementById('f-email').value.trim();
    var subject  = document.getElementById('f-subject').value;
    var message  = document.getElementById('f-message').value.trim();
    var memberid = document.getElementById('f-memberid').value.trim();

    if (!name)    { document.getElementById('f-name').focus();  return; }
    if (!email || email.indexOf('@') === -1) { document.getElementById('f-email').focus(); return; }
    if (!message) { document.getElementById('f-message').focus(); return; }

    var body = 'From: ' + name + ' <' + email + '>';
    if (memberid) { body += '\nMember/ID: ' + memberid; }
    body += '\n\n' + message;

    var mailto = 'mailto:samroqueries@seshego.co.za'
      + '?subject=' + encodeURIComponent('[SAMRO RAF] ' + subject)
      + '&body='    + encodeURIComponent(body);

    window.location.href = mailto;

    form.style.display    = 'none';
    success.style.display = 'block';
  });

  reset.addEventListener('click', function () {
    form.reset();
    form.style.display    = '';
    success.style.display = 'none';
  });

})();

(function () {
  /* ── Deferred background images ─────────────────────────────── */
  var bgObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.backgroundImage = e.target.dataset.bg;
        bgObs.unobserve(e.target);
      }
    });
  }, { rootMargin: '400px' });
  document.querySelectorAll('section[data-bg]').forEach(function (el) {
    bgObs.observe(el);
  });
})();
