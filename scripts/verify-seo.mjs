import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const htmlPath = resolve(dist, "index.html");
const cnamePath = resolve(dist, "CNAME");
const sitemapPath = resolve(dist, "sitemap.xml");
const robotsPath = resolve(dist, "robots.txt");
const notFoundPath = resolve(dist, "404.html");

function fail(message) {
  console.error(`verify-seo: ${message}`);
  process.exit(1);
}

for (const file of [htmlPath, cnamePath, sitemapPath, robotsPath, notFoundPath]) {
  if (!existsSync(file)) fail(`missing ${file}`);
}

const html = readFileSync(htmlPath, "utf8");
const cname = readFileSync(cnamePath, "utf8").trim();
const sitemap = readFileSync(sitemapPath, "utf8");
const robots = readFileSync(robotsPath, "utf8");
const notFound = readFileSync(notFoundPath, "utf8");

if (cname !== "smmiri.com") fail(`CNAME should be smmiri.com, got ${JSON.stringify(cname)}`);

const requiredHtml = [
  "Mohammad Miri",
  "Senior Specialist",
  "University of Victoria",
  "application/ld+json",
  'rel="canonical"',
  "https://smmiri.com/",
  "Energy systems engineer",
];

for (const needle of requiredHtml) {
  if (!html.includes(needle)) fail(`index.html missing ${JSON.stringify(needle)}`);
}

const ldMatch = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
if (!ldMatch) fail("JSON-LD script not found");
let graph;
try {
  graph = JSON.parse(ldMatch[1]);
} catch {
  fail("JSON-LD is not valid JSON");
}
if (graph["@context"] !== "https://schema.org") fail("JSON-LD missing schema.org context");
if (!JSON.stringify(graph).includes("Person")) fail("JSON-LD missing Person");

if (!sitemap.includes("https://smmiri.com/")) fail("sitemap missing apex URL");
if (!robots.includes("Sitemap: https://smmiri.com/sitemap.xml")) fail("robots.txt missing sitemap line");
if (!notFound.includes("404") || !notFound.includes("noindex")) {
  fail("404.html should be a distinct noindex not-found page");
}

const rootIdx = html.indexOf('<div id="root">');
if (rootIdx === -1) fail("index.html is missing #root");
const rootSnippet = html.slice(rootIdx, rootIdx + 8000);
if (!rootSnippet.includes("Mohammad Miri") || !rootSnippet.includes("Senior Specialist")) {
  fail("#root does not contain prerendered CV text");
}

if (html.length < 50000) fail(`index.html too small (${html.length} bytes)`);

console.log("verify-seo: ok");
