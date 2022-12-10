import { normalizePath } from "vite";
import path from "path";

const variablePath = normalizePath(path.resolve("./assets/styles/mixin.styl"));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "referrer", content: "no-referrer" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "//at.alicdn.com/t/font_628648_3v3x53p1ger.css",
        },
        { rel: "icon", href: "/favicon.ico" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  experimental: {
    reactivityTransform: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import "${variablePath}"`,
        },
      },
    },
  },
});
