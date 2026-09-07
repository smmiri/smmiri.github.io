import assert from "node:assert/strict";
import cv from "../content/cv.json" with { type: "json" };
import { escapeHtml, injectPrerender, jsonLdGraph, prerenderCv, sitemapXml } from "../src/seo.js";

assert.equal(escapeHtml('a <b> & "c"'), "a &lt;b&gt; &amp; &quot;c&quot;");

const body = prerenderCv(cv);
assert.match(body, /Mohammad Miri/);
assert.match(body, /Senior Specialist/);
assert.match(body, /ElectrifiedGrid/);
assert.match(body, /spruce\.smmiri\.com/);
assert.doesNotMatch(body, /<script/i);

const graph = jsonLdGraph(cv);
assert.equal(graph["@context"], "https://schema.org");
assert.ok(graph["@graph"].some((node) => node["@type"] === "Person"));

const sitemap = sitemapXml(cv, "https://smmiri.com", "2026-09-07");
assert.match(sitemap, /<loc>https:\/\/smmiri\.com\/<\/loc>/);
assert.match(sitemap, /rentorbuy\.smmiri\.com/);

const source = `<html><head></head><body><div id="root"><div>empty</div></div>\n    <script type="module" src="/src/main.jsx"></script></body></html>`;
const injected = injectPrerender(source, {
  body: "<article>Mohammad Miri</article>",
  jsonLd: JSON.stringify(graph),
});
assert.match(injected, /application\/ld\+json/);
assert.match(injected, /<div id="root"><article>Mohammad Miri<\/article><\/div>/);
assert.match(injected, /<script type="module"/);
assert.doesNotMatch(injected, /id="root">[\s\S]*empty/);

console.log("seo.test: ok");
