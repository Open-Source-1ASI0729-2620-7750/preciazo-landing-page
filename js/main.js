(() => {
  "use strict";

  const translations = {
    en_US: {
      "nav.product": "Product",
      "nav.how": "How it works",
      "nav.merchants": "Merchants",
      "nav.videos": "Videos",
      "nav.pricing": "Plans & Pricing",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.merchantCta": "Merchant Portal",
      "nav.buyerCta": "Open Web App",
      "hero.eyebrow": "Smart Shopping Platform · Peru",
      "hero.title": "Save on your <span>Grocery Basket</span> with Multi-Stop Routes and Real Prices",
      "hero.lead": "Plan your shopping list, respect your budget limit, and optimize your urban itinerary across nearby retail stores with verified prices.",
      "hero.ctaBuyer": "Start as Buyer",
      "hero.ctaMerchant": "Join as Merchant",
      "hero.proof1": "Verified prices",
      "hero.proof2": "Smart OSRM routes",
      "hero.proof3": "Active community",
      "profile.buyerCta": "Enter Buyer Portal",
      "profile.merchantCta": "Enter Merchant Portal",
      "videos.eyebrow": "Discover Preciazo in Action",
      "videos.title": "About the Product & About the Team",
      "videos.subtitle": "Watch how Preciazo helps Lima buyers and local merchants save time and money, and meet the PeruTech engineering team.",
      "videos.productTitle": "About the Product",
      "videos.productDesc": "Value proposition, multi-store basket comparison, OSRM route planning, and user validation highlights.",
      "videos.teamTitle": "About the Team — PeruTech",
      "videos.teamPlaceholder": "PeruTech Team Retrospective Video (YouTube embed ready for Sprint 4 release)",
      "videos.teamDesc": "Behind the scenes of our Scrum sprints, DDD architecture, and engineering process at UPC.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions of Service",
      "terms.title": "Terms and Conditions of Service",
      "terms.body1": "Preciazo (PeruTech) is developed and operated under the principles of the ACM/IEEE Software Engineering Code of Ethics and the Code of Ethics of the Colegio de Ingenieros del Perú (CIP).",
      "terms.body2": "We guarantee transparency in price comparison, protect user credentials with BCrypt and stateless JWT authentication, and promote inclusive web accessibility (a11y/ARIA) and bilingual internationalization (en_US, es_419).",
      "terms.body3": "Users commit to submitting truthful shelf price observations and respecting merchant and community integrity.",
      "terms.close": "Close",
    },
    es_419: {
      "nav.product": "Producto",
      "nav.how": "Cómo funciona",
      "nav.merchants": "Comercios",
      "nav.videos": "Videos",
      "nav.pricing": "Planes y precios",
      "nav.faq": "Preguntas",
      "nav.contact": "Contáctanos",
      "nav.merchantCta": "Portal Comercio",
      "nav.buyerCta": "Abrir Web App",
      "hero.eyebrow": "Plataforma de Compras Inteligentes · Perú",
      "hero.title": "Ahorra en tu <span>Canasta Básica</span> con Rutas Multiparada y Precios Reales",
      "hero.lead": "Planifica tu lista de compras, respeta tu presupuesto límite y optimiza tus desplazamientos conectando comercios minoristas con precios verificados.",
      "hero.ctaBuyer": "Empezar como Comprador",
      "hero.ctaMerchant": "Únete como Comercio",
      "hero.proof1": "Precios verificados",
      "hero.proof2": "Rutas OSRM inteligentes",
      "hero.proof3": "Comunidad activa",
      "profile.buyerCta": "Ingresar como Comprador",
      "profile.merchantCta": "Ingresar como Comerciante",
      "videos.eyebrow": "Descubre Preciazo en Acción",
      "videos.title": "Video About the Product & About the Team",
      "videos.subtitle": "Conoce cómo Preciazo ayuda a compradores y comercios en Lima Metropolitana y conoce al equipo PeruTech.",
      "videos.productTitle": "Sobre el Producto (About the Product)",
      "videos.productDesc": "Propuesta de valor, comparador multitienda, optimizador de rutas OSRM y testimonios de validación.",
      "videos.teamTitle": "Sobre el Equipo (About the Team — PeruTech)",
      "videos.teamPlaceholder": "Video Retrospectiva del Equipo PeruTech (listo para incrustar URL de YouTube)",
      "videos.teamDesc": "Detrás de escena de nuestros Sprints Scrum, arquitectura DDD y proceso de ingeniería en la UPC.",
      "footer.privacy": "Política de Privacidad",
      "footer.terms": "Términos y Condiciones de Servicio",
      "terms.title": "Términos y Condiciones de Servicio",
      "terms.body1": "Preciazo (PeruTech) se desarrolla y opera bajo los principios del Código de Ética de Ingeniería de Software ACM/IEEE y del Colegio de Ingenieros del Perú (CIP).",
      "terms.body2": "Garantizamos transparencia en la comparación de precios, protección de credenciales mediante BCrypt y JWT sin estado, accesibilidad web (a11y/ARIA) e internacionalización (en_US, es_419).",
      "terms.body3": "Los usuarios se comprometen a reportar precios reales observados en tienda y respetar la integridad de la comunidad y los comercios aliados.",
      "terms.close": "Cerrar",
    },
  };

  let currentLocale = localStorage.getItem("preciazo_landing_locale") === "es_419" ? "es_419" : "en_US";

  const applyLocale = (locale) => {
    currentLocale = locale;
    localStorage.setItem("preciazo_landing_locale", locale);
    document.documentElement.lang = locale === "es_419" ? "es-419" : "en-US";
    const dict = translations[locale];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || !dict[key]) return;
      if (key === "hero.title") {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });
    const langBtn = document.querySelector("[data-lang-toggle]");
    if (langBtn) langBtn.textContent = locale === "en_US" ? "EN · ES" : "ES · EN";
  };

  const langToggle = document.querySelector("[data-lang-toggle]");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLocale(currentLocale === "en_US" ? "es_419" : "en_US");
    });
  }
  applyLocale(currentLocale);

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = document.getElementById(question.getAttribute("aria-controls"));
      const isExpanded = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!isExpanded));
      if (answer) answer.hidden = isExpanded;
    });
  });

  document.querySelectorAll(".toggle-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".toggle-option").forEach((item) => {
        const isSelected = item === option;
        item.classList.toggle("is-selected", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });
    });
  });

  document.querySelectorAll("[data-demo-form], [data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status], [data-contact-status]");
      if (status) {
        status.textContent =
          currentLocale === "en_US"
            ? "Thank you! We received your request and will reply shortly."
            : "¡Gracias! Recibimos tu solicitud y te responderemos pronto.";
      }
      form.reset();
    });
  });

  const termsModal = document.getElementById("terms-modal");
  if (termsModal) {
    document.querySelectorAll("[data-open-terms]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        termsModal.hidden = false;
      });
    });
    document.querySelectorAll("[data-close-terms]").forEach((btn) => {
      btn.addEventListener("click", () => {
        termsModal.hidden = true;
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !termsModal.hidden) termsModal.hidden = true;
    });
  }

  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`),
          );
        });
      },
      { rootMargin: "-35% 0px -55%" },
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
