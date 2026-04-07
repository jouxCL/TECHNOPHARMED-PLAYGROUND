globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, l as renderScript, h as createAstro, n as renderHead, k as renderComponent, o as renderSlot } from './astro/server_CrBcLEcb.mjs';
/* empty css                               */

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const pathname = Astro2.url.pathname;
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/punzoneria", label: "Punzoner\xEDa" },
    { href: "/llenadoras", label: "Llenadoras de L\xEDquidos" },
    { href: "/tableteadoras", label: "Tableteadoras" },
    { href: "/respaldo-tecnico", label: "Respaldo T\xE9cnico" },
    { href: "/contactenos", label: "Cont\xE1ctenos" }
  ];
  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }
  return renderTemplate`${maybeRenderHead()}<header class="navbar" data-astro-cid-5blmo7yk> <div class="navbar__inner" data-astro-cid-5blmo7yk> <!-- Logo --> <div class="navbar__logo" data-astro-cid-5blmo7yk> <a href="/" data-astro-cid-5blmo7yk> <img src="/logos/logo1.svg" alt="Technopharmed" data-astro-cid-5blmo7yk> </a> </div> <!-- Navigation --> <nav data-astro-cid-5blmo7yk> <ul class="navbar__nav" id="mobile-menu" data-astro-cid-5blmo7yk> ${links.map(({ href, label }) => renderTemplate`<li data-astro-cid-5blmo7yk> <a${addAttribute(href, "href")}${addAttribute([
    { "is-active": isActive(href) },
    { "nav--highlight": href === "/contactenos" }
  ], "class:list")} data-astro-cid-5blmo7yk> ${label} </a> </li>`)} </ul> </nav> <!-- Mobile button --> <button class="navbar__toggle" id="mobile-toggle" type="button" aria-label="Menú" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-5blmo7yk> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-5blmo7yk> <path d="M4 6h16M4 12h16M4 18h16" data-astro-cid-5blmo7yk></path> </svg> </button> </div> </header> ${renderScript($$result, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- ═══ FOOTER ═══ -->${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="footer-inner" data-astro-cid-sz7xmlte> <div class="reveal" data-astro-cid-sz7xmlte> <div class="footer-logo" data-astro-cid-sz7xmlte>TECHNOPHARMED</div> <p class="footer-tagline" data-astro-cid-sz7xmlte>Compromiso, Respaldo e Innovación.<br data-astro-cid-sz7xmlte>Soluciones farmacéuticas de clase mundial.</p> </div> <div class="reveal stagger-1" data-astro-cid-sz7xmlte> <p class="footer-col-title" data-astro-cid-sz7xmlte>Contacto</p> <div class="f-item" data-astro-cid-sz7xmlte> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" data-astro-cid-sz7xmlte><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="rgba(255,255,255,.55)" stroke-width="2" data-astro-cid-sz7xmlte></path><circle cx="12" cy="9" r="2.5" stroke="rgba(255,255,255,.55)" stroke-width="2" data-astro-cid-sz7xmlte></circle></svg> <span data-astro-cid-sz7xmlte>Carrera 3F Nº 32A-13, Manizales, Colombia.</span> </div> <div class="f-item" data-astro-cid-sz7xmlte> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" data-astro-cid-sz7xmlte><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="rgba(255,255,255,.55)" stroke-width="2" data-astro-cid-sz7xmlte></path></svg> <a href="tel:+573138311426" data-astro-cid-sz7xmlte>(+57) 313 831 1426</a> </div> <div class="f-item" data-astro-cid-sz7xmlte> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" data-astro-cid-sz7xmlte><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.55)" stroke-width="2" data-astro-cid-sz7xmlte></circle><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="rgba(255,255,255,.55)" stroke-width="2" data-astro-cid-sz7xmlte></path></svg> <a href="https://www.technopharmed.com" target="_blank" data-astro-cid-sz7xmlte>www.technopharmed.com</a> </div> </div> <div class="reveal stagger-2" data-astro-cid-sz7xmlte> <p class="footer-col-title" data-astro-cid-sz7xmlte>Directorio</p> <div class="f-dir" data-astro-cid-sz7xmlte><strong data-astro-cid-sz7xmlte>Gerencia — Ing. Juan Quintero</strong><a href="mailto:gerencia@technopharmed.com" data-astro-cid-sz7xmlte>gerencia@technopharmed.com</a> · 313 831 1426</div> <div class="f-dir" data-astro-cid-sz7xmlte><strong data-astro-cid-sz7xmlte>Administrativo — Claudia Santa</strong><a href="mailto:administrativo@technopharmed.com" data-astro-cid-sz7xmlte>administrativo@technopharmed.com</a> · 313 627 36 94</div> </div> </div> <hr class="fhr" data-astro-cid-sz7xmlte> <div class="footer-bottom" data-astro-cid-sz7xmlte> <span data-astro-cid-sz7xmlte>© 2025 Technopharmed. Todos los derechos reservados.</span> <span data-astro-cid-sz7xmlte>Manizales, Colombia</span> </div> </footer>`;
}, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Technopharmed \u2013 Soluciones farmac\xE9uticas de alta calidad con m\xE1s de 20 a\xF1os de experiencia." } = Astro2.props;
  return renderTemplate`${renderScript($$result, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} <html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts")} </body> </html>`;
}, "C:/Users/juans/Downloads/Micelaneas/Legion Web/Repositorios/Technopharmed playground/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
