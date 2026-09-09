// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteHeader = document.querySelector('.site-header');

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.site-nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Savings calculator
const calcPeople = document.getElementById('calc-people');
const calcHours = document.getElementById('calc-hours');
const calcRate = document.getElementById('calc-rate');
const calcAnnualEl = document.getElementById('calc-annual');
const calcHoursYearEl = document.getElementById('calc-hours-year');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-AU');

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

let calcAnnualValue = 0;
let calcHoursYearValue = 0;
let calcAnimFrame = null;

function animateCalcTo(nextAnnual, nextHoursYear) {
  const fromAnnual = calcAnnualValue;
  const fromHoursYear = calcHoursYearValue;

  if (calcAnimFrame) cancelAnimationFrame(calcAnimFrame);

  if (prefersReducedMotion) {
    calcAnnualValue = nextAnnual;
    calcHoursYearValue = nextHoursYear;
    calcAnnualEl.textContent = currencyFormatter.format(nextAnnual);
    calcHoursYearEl.textContent = numberFormatter.format(nextHoursYear);
    return;
  }

  const duration = 1000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutCubic(progress);

    const annualNow = Math.round(fromAnnual + (nextAnnual - fromAnnual) * eased);
    const hoursYearNow = Math.round(fromHoursYear + (nextHoursYear - fromHoursYear) * eased);

    calcAnnualEl.textContent = currencyFormatter.format(annualNow);
    calcHoursYearEl.textContent = numberFormatter.format(hoursYearNow);

    if (progress < 1) {
      calcAnimFrame = requestAnimationFrame(tick);
    } else {
      calcAnnualValue = nextAnnual;
      calcHoursYearValue = nextHoursYear;
    }
  }

  calcAnimFrame = requestAnimationFrame(tick);
}

// Single source of truth for the formula: both the on-page figure and the
// sessionStorage handoff to Free Assessment read from this, so they can
// never drift apart the way they could when each computed separately.
function computeCalculatorValues() {
  const people = Math.max(0, Number(calcPeople.value) || 0);
  const hours = Math.max(0, Number(calcHours.value) || 0);
  const rate = Math.max(0, Number(calcRate.value) || 0);

  const hoursPerYear = people * hours * 52;
  const annualValue = hoursPerYear * rate;

  return { annualValue, hoursPerYear };
}

function updateCalculator() {
  const { annualValue, hoursPerYear } = computeCalculatorValues();

  animateCalcTo(annualValue, hoursPerYear);

  sessionStorage.setItem('revvi_calc_result', JSON.stringify({ annualValue, hoursPerYear }));
}

if (calcPeople && calcHours && calcRate) {
  // Compute and store the real result for the current field values as soon
  // as the page loads, rather than only on the first input change. Without
  // this, sessionStorage was never written until the user touched a field,
  // so it could still hold a stale value from an earlier visit even though
  // the page was showing (what looked like) a fresh default — Free
  // Assessment would then show that stale number with no way to tell it
  // didn't match what was just on screen. Set directly (no animation) so
  // nothing visibly moves before the user has done anything.
  const initial = computeCalculatorValues();
  calcAnnualValue = initial.annualValue;
  calcHoursYearValue = initial.hoursPerYear;
  calcAnnualEl.textContent = currencyFormatter.format(initial.annualValue);
  calcHoursYearEl.textContent = numberFormatter.format(initial.hoursPerYear);
  sessionStorage.setItem('revvi_calc_result', JSON.stringify(initial));

  calcPeople.addEventListener('input', updateCalculator);
  calcHours.addEventListener('input', updateCalculator);
  calcRate.addEventListener('input', updateCalculator);

  // Custom +/- buttons, replacing the native spinners hidden in CSS (those
  // render on desktop but not on mobile, so the control behaved differently
  // depending on device). These run the same recalculation a typed change
  // does, so both entry methods stay in sync.
  document.querySelectorAll('.calc-step').forEach((btn) => {
    btn.addEventListener('click', () => {
      const field = document.getElementById(btn.dataset.stepFor);
      if (!field) return;

      const step = Number(field.step) || 1;
      const direction = Number(btn.dataset.stepDir);
      const min = field.min === '' ? -Infinity : Number(field.min);
      const current = Number(field.value) || 0;

      field.value = Math.max(min, current + step * direction);
      updateCalculator();
    });
  });
}

// Stat rings: draw-in + number count-up, once, on scroll into view
const statRings = document.querySelectorAll('.stat-ring-wrap');

function animateStatRing(wrap) {
  const target = Number(wrap.dataset.ringTarget);
  const offset = Number(wrap.dataset.ringOffset);
  const circle = wrap.querySelector('.stat-ring-fill');
  const valueEl = wrap.querySelector('.stat-ring-value');

  if (prefersReducedMotion) {
    circle.style.strokeDashoffset = offset;
    valueEl.textContent = target + '%';
    return;
  }

  // Triggering the dashoffset change kicks off the CSS transition (see .stat-ring-fill)
  requestAnimationFrame(() => {
    circle.style.strokeDashoffset = offset;
  });

  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutCubic(progress);
    valueEl.textContent = Math.round(target * eased) + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      valueEl.textContent = target + '%';
    }
  }

  requestAnimationFrame(tick);
}

if (statRings.length && 'IntersectionObserver' in window) {
  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatRing(entry.target);
          ringObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  statRings.forEach((wrap) => ringObserver.observe(wrap));
} else {
  statRings.forEach(animateStatRing);
}
