var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { c as createExports, s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_BkDGlC4K.mjs";
import { manifest } from "./manifest_DbICk212.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var serverIslandMap = /* @__PURE__ */ new Map();
var _page0 = /* @__PURE__ */ __name(() => import("./pages/_image.astro.mjs"), "_page0");
var _page1 = /* @__PURE__ */ __name(() => import("./pages/api/contact.astro.mjs"), "_page1");
var _page2 = /* @__PURE__ */ __name(() => import("./pages/contactenos.astro.mjs"), "_page2");
var _page3 = /* @__PURE__ */ __name(() => import("./pages/llenadoras.astro.mjs"), "_page3");
var _page4 = /* @__PURE__ */ __name(() => import("./pages/punzoneria.astro.mjs"), "_page4");
var _page5 = /* @__PURE__ */ __name(() => import("./pages/respaldo-tecnico.astro.mjs"), "_page5");
var _page6 = /* @__PURE__ */ __name(() => import("./pages/tableteadoras.astro.mjs"), "_page6");
var _page7 = /* @__PURE__ */ __name(() => import("./pages/index.astro.mjs"), "_page7");
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
  ["src/pages/api/contact.ts", _page1],
  ["src/pages/contactenos.astro", _page2],
  ["src/pages/llenadoras.astro", _page3],
  ["src/pages/punzoneria.astro", _page4],
  ["src/pages/respaldo-tecnico.astro", _page5],
  ["src/pages/tableteadoras.astro", _page6],
  ["src/pages/index.astro", _page7]
]);
var _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: /* @__PURE__ */ __name(() => import("./noop-entrypoint.mjs"), "actions"),
  middleware: /* @__PURE__ */ __name(() => import("./_astro-internal_middleware.mjs"), "middleware")
});
var _args = void 0;
var _exports = createExports(_manifest);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
//# sourceMappingURL=bundledWorker-0.992531881069796.mjs.map
