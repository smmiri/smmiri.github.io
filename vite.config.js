import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const PLACEHOLDER_HOST = "https://smmiri.com";

function siteUrlSubstitution(siteUrl) {
  if (!siteUrl || siteUrl === PLACEHOLDER_HOST) return null;
  const trimmed = siteUrl.replace(/\/$/, "");
  const replace = (s) => s.split(PLACEHOLDER_HOST).join(trimmed);
  return {
    name: "site-url-substitution",
    apply: "build",
    transformIndexHtml: (html) => replace(html),
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === "asset" && typeof file.source === "string") {
          file.source = replace(file.source);
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";
  return {
    base: env.VITE_BASE || "/",
    plugins: [
      react(),
      tailwindcss(),
      isProd && viteSingleFile(),
      siteUrlSubstitution(env.VITE_SITE_URL),
    ].filter(Boolean),
  };
});
