/* empty css                                 */
import { Q as createComponent, a0 as renderComponent, a7 as renderTemplate, _ as maybeRenderHead, B as addAttribute } from '../chunks/astro/server_oT8Kx1uN.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_B0qVImWu.mjs';
import { s as supabaseAdmin } from '../chunks/supabase_BE5k4aVa.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: events } = await supabaseAdmin.from("events").select("*").eq("is_active", true).order("date_start", { ascending: false });
  const now = /* @__PURE__ */ new Date();
  const upcomingEvents = events?.filter((e) => new Date(e.date_start) > now) ?? [];
  const pastEvents = events?.filter((e) => new Date(e.date_start) <= now) ?? [];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Semua Event \u2014 BERKABARET" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-4 py-16"> <div class="mb-12"> <h1 class="font-display font-extrabold text-4xl mb-3">Semua Event</h1> <p class="text-gray-500">Temukan event yang kamu cari dan beli tiketnya sekarang</p> </div> <!-- Upcoming --> <div class="mb-16"> <div class="flex items-center gap-3 mb-8"> <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span> <h2 class="font-display font-bold text-2xl">Event Mendatang</h2> <span class="bg-brand-900/40 border border-brand-700/30 text-brand-400 text-xs font-mono px-2.5 py-1 rounded-full">${upcomingEvents.length}</span> </div> ${upcomingEvents.length === 0 ? renderTemplate`<div class="text-center py-16 bg-dark-800/50 border border-dark-600/30 rounded-2xl text-gray-600"> <p class="text-4xl mb-3">📅</p> <p class="font-semibold text-gray-500">Belum ada event mendatang</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${upcomingEvents.map((event) => {
    const date = new Date(event.date_start);
    const dateStr = date.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
    const timeStr = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const minPrice = event.ticket_types?.length ? Math.min(...event.ticket_types.map((t) => t.price)) : 0;
    const totalQuota = event.ticket_types?.reduce((s, t) => s + t.quota, 0) ?? 0;
    const totalSold = event.ticket_types?.reduce((s, t) => s + t.sold, 0) ?? 0;
    const remaining = totalQuota - totalSold;
    return renderTemplate`<a${addAttribute(`/events/${event.slug}`, "href")} class="group block bg-dark-800 border border-dark-600/50 rounded-2xl overflow-hidden hover:border-brand-700/50 transition-all duration-300 hover:-translate-y-1"> <div class="aspect-[16/9] bg-gradient-to-br from-brand-900/50 to-dark-700 flex items-center justify-center relative overflow-hidden"> ${event.cover_image ? renderTemplate`<img${addAttribute(event.cover_image, "src")}${addAttribute(event.title, "alt")} class="w-full h-full object-cover">` : renderTemplate`<span class="text-5xl opacity-20">🎪</span>`} ${remaining <= 20 && remaining > 0 && renderTemplate`<div class="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Sisa ${remaining}!</div>`} ${remaining === 0 && renderTemplate`<div class="absolute inset-0 bg-dark-900/70 flex items-center justify-center"> <span class="bg-dark-800 border border-dark-500 text-gray-400 font-semibold px-4 py-2 rounded-full text-sm">Sold Out</span> </div>`} </div> <div class="p-5"> <h3 class="font-display font-semibold text-white group-hover:text-brand-300 transition-colors mb-1 line-clamp-2">${event.title}</h3> <p class="text-xs text-gray-500 mb-1">📅 ${dateStr} · ${timeStr} WIB</p> <p class="text-xs text-gray-500 mb-4">📍 ${event.venue}</p> <div class="flex items-center justify-between pt-3 border-t border-dark-600/50"> <span class="text-brand-400 font-mono font-semibold text-sm"> ${minPrice === 0 ? "Gratis" : `Mulai Rp ${minPrice.toLocaleString("id-ID")}`} </span> <span class="text-xs text-gray-600">${totalSold}/${totalQuota} terjual</span> </div> </div> </a>`;
  })} </div>`} </div> <!-- Past Events --> ${pastEvents.length > 0 && renderTemplate`<div> <div class="flex items-center gap-3 mb-8"> <span class="w-2 h-2 rounded-full bg-gray-600"></span> <h2 class="font-display font-bold text-2xl text-gray-400">Event Sebelumnya</h2> <span class="bg-dark-700 border border-dark-600/30 text-gray-500 text-xs font-mono px-2.5 py-1 rounded-full">${pastEvents.length}</span> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${pastEvents.map((event) => {
    const date = new Date(event.date_start);
    const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const totalSold = event.ticket_types?.reduce((s, t) => s + t.sold, 0) ?? 0;
    return renderTemplate`<a${addAttribute(`/events/${event.slug}`, "href")} class="group block bg-dark-800/40 border border-dark-600/30 rounded-2xl overflow-hidden hover:border-dark-500/50 transition-all duration-300 opacity-65 hover:opacity-90"> <div class="aspect-[16/9] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center relative overflow-hidden"> ${event.cover_image ? renderTemplate`<img${addAttribute(event.cover_image, "src")}${addAttribute(event.title, "alt")} class="w-full h-full object-cover grayscale">` : renderTemplate`<span class="text-5xl opacity-20">🎪</span>`} <div class="absolute inset-0 bg-dark-900/30"></div> <div class="absolute top-3 left-3 bg-dark-900/80 text-xs font-medium text-gray-400 px-2.5 py-1 rounded-full border border-dark-600/50">Selesai</div> <div class="absolute top-3 right-3 bg-dark-900/80 text-xs font-mono text-gray-500 px-2 py-1 rounded-lg">${dateStr}</div> </div> <div class="p-5"> <h3 class="font-display font-semibold text-gray-400 group-hover:text-gray-200 transition-colors mb-1 line-clamp-2">${event.title}</h3> <p class="text-xs text-gray-600 mb-4">📍 ${event.venue}</p> <div class="flex items-center justify-between pt-3 border-t border-dark-600/30"> <span class="text-gray-600 text-xs">Event telah selesai</span> ${totalSold > 0 && renderTemplate`<span class="text-gray-600 text-xs font-mono">${totalSold} hadir</span>`} </div> </div> </a>`;
  })} </div> </div>`} </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/events/index.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/events/index.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
