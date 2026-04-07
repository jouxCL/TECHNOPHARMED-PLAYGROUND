// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/images/.gitkeep",
    "/videos/.gitkeep",
    "/videos/Punzones.mp4",
    "/fonts/.gitkeep",
    "/icons/.gitkeep",
    "/logos/.gitkeep",
    "/logos/logo1.svg",
    "/logos/we are in development.svg",
    "/images/inicio/dab-8-4.png",
    "/images/inicio/Punzon.png",
    "/images/inicio/tableteadora.png",
    "/images/punzones/macthecno.png",
    "/images/punzones/Matriz.png",
    "/images/punzones/Multipunzon.png",
    "/images/punzones/PunzonCorroido.png",
    "/images/punzones/PunzonInferior.png",
    "/images/punzones/PunzonNoCorroido.png",
    "/images/punzones/PunzonSuperior.png",
    "/images/punzones/SegmentodeMatriz.png"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\juans\\Downloads\\Micelaneas\\Legion Web\\Repositorios\\Technopharmed playground\\.wrangler\\tmp\\pages-PjbCnM\\bundledWorker-0.7650408801285163.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\juans\\Downloads\\Micelaneas\\Legion Web\\Repositorios\\Technopharmed playground\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\juans\\Downloads\\Micelaneas\\Legion Web\\Repositorios\\Technopharmed playground\\.wrangler\\tmp\\pages-PjbCnM\\bundledWorker-0.7650408801285163.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=ty5gkvu125q.js.map
