import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import english from "../js/locales/en-US.js";
import spanish from "../js/locales/es-419.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const html = readFileSync(resolve(root, "index.html"), "utf8");
assert.deepEqual(Object.keys(english).sort(), Object.keys(spanish).sort(), "Both locales must contain the same keys");
for (const [locale, messages] of Object.entries({ english, spanish })) {
  for (const [key, value] of Object.entries(messages)) {
    assert.ok(typeof value === "string" && value.trim(), `${locale}: missing translation for ${key}`);
  }
}
const usedKeys = new Set();
for (const match of html.matchAll(/data-i18n-(?:text|attrs)="([^"]+)"/g)) {
  for (const mapping of match[1].split(";")) {
    const key = mapping.slice(mapping.indexOf("=") + 1);
    assert.ok(Object.hasOwn(english, key), `Unknown translation: ${key}`);
    usedKeys.add(key);
  }
}
assert.ok(html.includes('<html lang="en-US">'), "English must be the default HTML language");
assert.ok(html.includes('content="en_US"'), "English must be the default Open Graph locale");
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const path = match[1];
  if (path.startsWith("#")) {
    assert.ok(html.includes(`id="${path.slice(1)}"`), `Missing anchor: ${path}`);
  } else if (!/^(?:https?:|mailto:|tel:)/.test(path)) {
    assert.ok(existsSync(resolve(root, path)), `Missing local asset: ${path}`);
  }
}
console.log(`Validated ${Object.keys(english).length} translations per locale, ${usedKeys.size} HTML keys, links and local assets.`);
