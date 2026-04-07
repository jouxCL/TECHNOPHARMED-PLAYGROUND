globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrBcLEcb.mjs';
import { $ as $$Layout } from '../chunks/Layout_CkICJ7Lj.mjs';
/* empty css                                            */
export { renderers } from '../renderers.mjs';

const $$RespaldoTecnico = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Respaldo T\xE9cnico \u2013 Technopharmed", "description": "Asistencia t\xE9cnica, capacitaci\xF3n y mantenimiento preventivo para la industria farmac\xE9utica." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="development-page"> <div class="development-content"> <img src="/logos/logo1.svg" alt="Technopharmed Logo" class="development-logo"> <p class="development-title">Página en construcción</p> </div> </div> ` })} `;
}, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/pages/respaldo-tecnico.astro", void 0);

const $$file = "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/pages/respaldo-tecnico.astro";
const $$url = "/respaldo-tecnico";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RespaldoTecnico,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
