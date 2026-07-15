/* swordi.studios — i18n, scroll reveals, feather parallax */
(function () {
  "use strict";

  /* ============ i18n ============ */

  var translations = {
    en: {
      "nav.delikta": "Delikta",
      "nav.studio": "Studio",
      "nav.contact": "Contact",
      "hero.tag": "Independent game studio",
      "hero.sub": "We craft small, polished mobile games with a love for stories.",
      "hero.cta": "Discover Delikta",
      "delikta.kicker": "Case file 01 — our debut game",
      "delikta.tagline": "A new crime case · daily",
      "cta.playSmall": "Get it on",
      "cta.iosSmall": "Coming soon to the",
      "cta.more": 'More about the game at <a href="https://www.delikta.app" target="_blank" rel="noopener">delikta.app</a>',
      "studio.kicker": "The studio",
      "studio.title": "Games with words.",
      "studio.text": "swordi.studios is an independent game studio from Austria. We build small, thoughtful mobile games with a love for language and storytelling — one case at a time.",
      "studio.contact": 'Say hello: <a href="mailto:swordistudios@gmail.com">swordistudios@gmail.com</a>',
      "footer.imprint": "Imprint",
      "footer.privacy": "Privacy Policy"
    },
    de: {
      "nav.delikta": "Delikta",
      "nav.studio": "Studio",
      "nav.contact": "Kontakt",
      "hero.tag": "Unabhängiges Game Studio",
      "hero.sub": "Wir machen kleine, liebevoll gebaute Mobile Games mit einem Faible für Geschichten.",
      "hero.cta": "Delikta entdecken",
      "delikta.kicker": "Fallakte 01 — unser erstes Spiel",
      "delikta.tagline": "Ein neuer Kriminalfall · täglich",
      "cta.playSmall": "Jetzt bei",
      "cta.iosSmall": "Bald im",
      "cta.more": 'Mehr über das Spiel auf <a href="https://www.delikta.app" target="_blank" rel="noopener">delikta.app</a>',
      "studio.kicker": "Das Studio",
      "studio.title": "Spiele mit Worten.",
      "studio.text": "swordi.studios ist ein unabhängiges Game Studio aus Österreich. Wir bauen kleine, durchdachte Mobile Games mit Liebe zu Sprache und Storytelling — Fall für Fall.",
      "studio.contact": 'Sag hallo: <a href="mailto:swordistudios@gmail.com">swordistudios@gmail.com</a>',
      "footer.imprint": "Impressum",
      "footer.privacy": "Datenschutzerklärung"
    }
  };

  function getInitialLang() {
    try {
      var stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "de") return stored;
    } catch (e) { /* private mode */ }
    return (navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function setLang(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key]) el.innerHTML = dict[key];
    });

    // swap localized screenshots (en_XX_feature.webp <-> de_XX_feature.webp)
    document.querySelectorAll("img[data-shot]").forEach(function (img) {
      img.src = "assets/img/screenshots/" + lang + "_" + img.getAttribute("data-shot") + "_feature.webp";
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });

    try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  setLang(getInitialLang());

  /* ============ Nav background on scroll ============ */

  var nav = document.getElementById("nav");
  if (nav) {
    var onNavScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();
  }

  /* ============ Scroll reveals ============ */

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ============ Feather parallax ============ */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var feathers = document.querySelectorAll(".feather");
  if (!reduceMotion && feathers.length) {
    var ticking = false;
    var parallax = function () {
      var y = window.scrollY;
      feathers.forEach(function (f) {
        f.style.translate = "0 " + (y * parseFloat(f.getAttribute("data-speed") || "0.3") * -1) + "px";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(parallax);
      }
    }, { passive: true });
  }

  /* ============ Footer year ============ */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
