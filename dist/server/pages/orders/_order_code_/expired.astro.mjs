/* empty css                                       */
import { Q as createComponent, a0 as renderComponent, a7 as renderTemplate, O as createAstro, _ as maybeRenderHead, B as addAttribute } from '../../../chunks/astro/server_oT8Kx1uN.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../../chunks/Base_B0qVImWu.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_BE5k4aVa.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Expired = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Expired;
  const { order_code } = Astro2.params;
  const { data: order } = await supabaseAdmin.from("orders").select("*, events(slug)").eq("order_code", order_code).single();
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Pembayaran Expired \u2014 BERKABARET" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-lg mx-auto px-4 py-24 text-center"> <div class="text-6xl mb-6">⏰</div> <h1 class="font-display font-extrabold text-3xl mb-3 text-red-400">Waktu Habis</h1> <p class="text-gray-400 mb-8">
Maaf, batas waktu pembayaran untuk order <span class="font-mono text-white">${order_code}</span> sudah habis.
</p> <div class="flex flex-col sm:flex-row gap-3 justify-center"> ${order?.events?.slug && renderTemplate`<a${addAttribute(`/events/${order.events.slug}/register`, "href")} class="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
Beli Tiket Lagi
</a>`} <a href="/events" class="bg-dark-800 hover:bg-dark-700 border border-dark-600/50 text-white font-medium px-6 py-3 rounded-xl transition-colors">
Lihat Event Lain
</a> </div> </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/expired.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/expired.astro";
const $$url = "/orders/[order_code]/expired";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Expired,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
