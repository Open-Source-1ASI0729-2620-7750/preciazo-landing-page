import english from "./locales/en-US.js";
import spanish from "./locales/es-419.js";

const messages = { "en-US": english, "es-419": spanish };
const storageKey = "preciazo.language";
let locale = "en-US";

export function t(key) {
  return messages[locale][key] ?? english[key] ?? key;
}

function mappings(value) {
  return value.split(";").map((entry) => entry.split("="));
}

export function setLocale(requestedLocale) {
  locale = Object.hasOwn(messages, requestedLocale) ? requestedLocale : "en-US";
  document.documentElement.lang = locale;
  document.querySelector('meta[property="og:locale"]').content = locale.replace("-", "_");

  document.querySelectorAll("[data-i18n-text]").forEach((element) => {
    const nodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
    mappings(element.dataset.i18nText).forEach(([index, key]) => {
      const node = nodes[Number(index)];
      if (!node) return;
      const prefix = node.textContent.match(/^\s*/)[0];
      const suffix = node.textContent.match(/\s*$/)[0];
      node.textContent = prefix + t(key) + suffix;
    });
  });

  document.querySelectorAll("[data-i18n-attrs]").forEach((element) => {
    mappings(element.dataset.i18nAttrs).forEach(([attribute, key]) => {
      element.setAttribute(attribute, t(key));
    });
  });

  const menu = document.querySelector(".menu-toggle");
  menu.setAttribute("aria-label", t(menu.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open"));
  document.querySelectorAll("[data-status-key]").forEach((element) => {
    element.textContent = t(element.dataset.statusKey);
  });
  document.querySelector("#language-select").value = locale;

  try {
    localStorage.setItem(storageKey, locale);
  } catch {
    // The selector still works when browser storage is unavailable.
  }
}

let savedLocale;
try {
  savedLocale = localStorage.getItem(storageKey);
} catch {
  savedLocale = null;
}
setLocale(savedLocale ?? "en-US");
document.querySelector("#language-select").addEventListener("change", (event) => setLocale(event.target.value));
