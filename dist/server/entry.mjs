import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C94tdu2N.mjs';
import { manifest } from './manifest_8eP0tZ6z.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin/orders.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/api/admin/login.astro.mjs');
const _page5 = () => import('./pages/api/admin/logout.astro.mjs');
const _page6 = () => import('./pages/api/contact.astro.mjs');
const _page7 = () => import('./pages/api/orders/create.astro.mjs');
const _page8 = () => import('./pages/api/orders/status.astro.mjs');
const _page9 = () => import('./pages/api/webhook/mayar.astro.mjs');
const _page10 = () => import('./pages/contact.astro.mjs');
const _page11 = () => import('./pages/events/_slug_/register.astro.mjs');
const _page12 = () => import('./pages/events/_slug_.astro.mjs');
const _page13 = () => import('./pages/events.astro.mjs');
const _page14 = () => import('./pages/orders/_order_code_/expired.astro.mjs');
const _page15 = () => import('./pages/orders/_order_code_/payment.astro.mjs');
const _page16 = () => import('./pages/orders/_order_code_/success.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/orders.astro", _page2],
    ["src/pages/admin/index.astro", _page3],
    ["src/pages/api/admin/login.ts", _page4],
    ["src/pages/api/admin/logout.ts", _page5],
    ["src/pages/api/contact.ts", _page6],
    ["src/pages/api/orders/create.ts", _page7],
    ["src/pages/api/orders/status.ts", _page8],
    ["src/pages/api/webhook/mayar.ts", _page9],
    ["src/pages/contact.astro", _page10],
    ["src/pages/events/[slug]/register.astro", _page11],
    ["src/pages/events/[slug].astro", _page12],
    ["src/pages/events/index.astro", _page13],
    ["src/pages/orders/[order_code]/expired.astro", _page14],
    ["src/pages/orders/[order_code]/payment.astro", _page15],
    ["src/pages/orders/[order_code]/success.astro", _page16],
    ["src/pages/index.astro", _page17]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/joans/Downloads/berkabaret/dist/client/",
    "server": "file:///Users/joans/Downloads/berkabaret/dist/server/",
    "host": true,
    "port": 3000,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
