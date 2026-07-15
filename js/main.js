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
      "delikta.intro": "Delikta is a daily detective game. Read the story, find the clues, question every suspect — and solve the case before the trail goes cold.",
      "f1.kicker": "Case file 01",
      "f1.title": "A new case every day",
      "f1.text": "One fresh mystery every 24 hours. Keep your streak alive and solve it before the trail goes cold.",
      "f2.kicker": "Case file 02",
      "f2.title": "Read the story, find the clues",
      "f2.text": "Every case is a short crime story full of suspects and motives — told chapter by chapter.",
      "f3.kicker": "Case file 03",
      "f3.title": "Question every suspect",
      "f3.text": "Everyone has an alibi. One of them is lying. Study the dossiers and trust no one.",
      "f4.kicker": "Case file 04",
      "f4.title": "Keep your streak alive",
      "f4.text": "Stats, leaderboard, success rate — prove you're the sharpest detective in town.",
      "cta.title": "Start investigating today",
      "cta.playSmall": "Get it on",
      "cta.iosSmall": "Coming soon to the",
      "cta.more": 'More about the game at <a href="https://www.delikta.app" target="_blank" rel="noopener">delikta.app</a>',
      "studio.kicker": "The studio",
      "studio.title": "Games with words.",
      "studio.text": "swordi.studios is an independent game studio from Austria. We build small, thoughtful mobile games with a love for language and storytelling — one case at a time.",
      "studio.contact": 'Say hello: <a href="mailto:hello@swordistudios.com">hello@swordistudios.com</a>',
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
      "delikta.intro": "Delikta ist ein tägliches Detektivspiel. Lies die Geschichte, finde die Hinweise, verhöre alle Verdächtigen — und löse den Fall, bevor die Spur kalt wird.",
      "f1.kicker": "Fallakte 01",
      "f1.title": "Jeden Tag ein neuer Fall",
      "f1.text": "Alle 24 Stunden ein frisches Rätsel. Halte deine Serie am Leben und löse den Fall, bevor die Spur kalt wird.",
      "f2.kicker": "Fallakte 02",
      "f2.title": "Lies die Geschichte, finde die Hinweise",
      "f2.text": "Jeder Fall ist eine kurze Kriminalgeschichte voller Verdächtiger und Motive — erzählt Kapitel für Kapitel.",
      "f3.kicker": "Fallakte 03",
      "f3.title": "Verhöre jeden Verdächtigen",
      "f3.text": "Alle haben ein Alibi. Einer lügt. Studiere die Akten und traue niemandem.",
      "f4.kicker": "Fallakte 04",
      "f4.title": "Halte deine Serie am Leben",
      "f4.text": "Statistiken, Bestenliste, Erfolgsquote — beweise, dass du die schärfste Spürnase der Stadt bist.",
      "cta.title": "Beginne noch heute zu ermitteln",
      "cta.playSmall": "Jetzt bei",
      "cta.iosSmall": "Bald im",
      "cta.more": 'Mehr über das Spiel auf <a href="https://www.delikta.app" target="_blank" rel="noopener">delikta.app</a>',
      "studio.kicker": "Das Studio",
      "studio.title": "Spiele mit Worten.",
      "studio.text": "swordi.studios ist ein unabhängiges Game Studio aus Österreich. Wir bauen kleine, durchdachte Mobile Games mit Liebe zu Sprache und Storytelling — Fall für Fall.",
      "studio.contact": 'Sag hallo: <a href="mailto:hello@swordistudios.com">hello@swordistudios.com</a>',
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
