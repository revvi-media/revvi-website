/* ============================================
   Revvi — Scroll Reveal Animations
   Drop-in, dependency-free scroll animations.
   Works with plain HTML/CSS/JS, no build step.
   ============================================ */

/*
  HOW TO USE
  ----------
  1. Add class="reveal" to any section/card/element you want to
     fade + slide in as the visitor scrolls to it.

  2. Optional stagger: add data-delay="1" / "2" / "3" etc. to
     child elements inside a revealed section (e.g. the 3 pillar
     cards) so they animate in one after another instead of all
     at once. Each step = 100ms.

     Example:
       <div class="cards-row">
         <div class="card reveal" data-delay="1">Finance & Admin</div>
         <div class="card reveal" data-delay="2">Sales & Leads</div>
         <div class="card reveal" data-delay="3">Operations</div>
       </div>

  3. Include reveal.css in your <head> and reveal.js before
     </body> (or with `defer`).

  Respects prefers-reduced-motion automatically — visitors who've
  turned off animations at the OS level just see content appear
  normally, no fade/slide.
*/
