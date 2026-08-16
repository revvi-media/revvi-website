/* ============================================
   Revvi — Scroll Reveal JS
   Dependency-free, ~30 lines. Uses IntersectionObserver,
   supported by every browser Revvi needs to support.
   ============================================ */

(function () {
  // Apply data-delay as a CSS custom property so reveal.css can
  // stagger transition-delay per element without extra classes.
  document.querySelectorAll('[data-delay]').forEach(function (el) {
    el.style.setProperty('--reveal-delay', el.getAttribute('data-delay'));
  });

  var revealEls = document.querySelectorAll('.reveal, .reveal-fade');

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    // Fallback for very old browsers: just show everything, no animation
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate in once, not on every scroll
        }
      });
    },
    {
      threshold: 0.15,       // trigger when 15% of the element is visible
      rootMargin: '0px 0px -40px 0px', // start slightly before it's fully in view
    }
  );

  revealEls.forEach(function (el) { observer.observe(el); });

  // Nav bar background swap on scroll (optional — only runs if
  // an element with id="siteNav" exists on the page)
  var nav = document.getElementById('siteNav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set correct state on page load if already scrolled
  }
})();
