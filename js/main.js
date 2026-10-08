import { t } from "./i18n.js";

(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", t("menu.open"));
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", t(isOpen ? "menu.close" : "menu.open"));
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
      const status = form.querySelector("[data-contact-status]") ?? form.parentElement.querySelector("[data-form-status]");
      if (status) {
        status.dataset.statusKey = form.matches("[data-contact-form]") ? "form.contact.success" : "form.launch.success";
        status.textContent = t(status.dataset.statusKey);
      }
      form.reset();
    });
  });

  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55%" });
    sections.forEach((section) => observer.observe(section));
  }
})();
