globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cfu44OFc.mjs';
import { $ as $$Layout } from '../chunks/Layout_BhGolOyy.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$Llenadoras = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Llenadoras de L\xEDquidos \u2013 Technopharmed", "description": "FILAMATIC \u2013 automatizaci\xF3n de llenado de l\xEDquidos para la industria farmac\xE9utica." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="development-page"> <div class="development-content"> <img src="/logos/logo1.svg" alt="Technopharmed Logo" class="development-logo"> <p class="development-title">Página en construcción</p> </div> </div> ` })} `;
}, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/pages/llenadoras.astro", void 0);

const $$file = "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/pages/llenadoras.astro";
const $$url = "/llenadoras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Llenadoras,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
