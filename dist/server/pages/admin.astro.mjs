/* empty css                                 */
import { Q as createComponent, O as createAstro } from '../chunks/astro/server_oT8Kx1uN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const isAuthenticated = Astro2.cookies.get("admin_session")?.value === "true";
  return Astro2.redirect(isAuthenticated ? "/admin/orders" : "/admin/login");
}, "/Users/joans/Downloads/berkabaret/src/pages/admin/index.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
