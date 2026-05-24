import { c as createComponent } from './astro-component_BxIlvnV1.mjs';
import 'piccolore';
import { r as renderComponent, q as renderTemplate, n as maybeRenderHead, j as addAttribute } from './server_COGFvjq1.mjs';
import { $ as $$Base } from './Base_Uz_3_hmj.mjs';
import { s as supabaseAdmin } from './supabase_BE5k4aVa.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: event } = await supabaseAdmin.from("events").select("*").eq("slug", slug).eq("is_active", true).single();
  if (!event) return Astro2.redirect("/events");
  const e = event;
  const dateStart = new Date(e.date_start);
  const dateEnd = e.date_end ? new Date(e.date_end) : null;
  const dateStr = dateStart.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = dateStart.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const timeEndStr = dateEnd ? dateEnd.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : null;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `${e.title} — BERKABARET`, "description": e.description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative"> <div class="h-72 md:h-96 bg-gradient-to-br from-brand-900/60 to-dark-700 relative overflow-hidden"> ${e.cover_image && renderTemplate`<img${addAttribute(e.cover_image, "src")}${addAttribute(e.title, "alt")} class="w-full h-full object-cover opacity-60">`} <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"></div> </div> <div class="max-w-5xl mx-auto px-4 relative -mt-20 pb-4"> <div class="inline-flex items-center gap-2 bg-brand-900/60 border border-brand-700/40 text-brand-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm"> <span class="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse"></span>
Event Aktif
</div> <h1 class="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight mb-4">${e.title}</h1> <div class="flex flex-wrap gap-4 text-sm text-gray-400"> <span>📅 ${dateStr}, ${timeStr}${timeEndStr ? ` – ${timeEndStr}` : ""} WIB</span> <span>📍 ${e.venue}</span> </div> </div> </div> <div class="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12"> <div class="lg:col-span-2 space-y-10"> <section> <h2 class="font-display font-bold text-xl mb-4 text-white">Tentang Event</h2> <p class="text-gray-400 leading-relaxed whitespace-pre-line">${e.description}</p> </section> <section> <h2 class="font-display font-bold text-xl mb-4 text-white">Lokasi</h2> <div class="bg-dark-800 border border-dark-600/50 rounded-xl p-4 flex items-start gap-3"> <span class="text-2xl mt-0.5">📍</span> <div> <p class="text-white font-medium">${e.venue}</p> <p class="text-gray-500 text-sm">${e.location}</p> </div> </div> </section> ${e.rundown && e.rundown.length > 0 && renderTemplate`<section> <h2 class="font-display font-bold text-xl mb-6 text-white">Rundown Acara</h2> <div class="space-y-0"> ${e.rundown.map((item, i) => renderTemplate`<div class="flex gap-4 relative"> <div class="flex flex-col items-center"> <div class="w-3 h-3 rounded-full bg-brand-500 border-2 border-brand-400 mt-1 shrink-0 z-10"></div> ${i < e.rundown.length - 1 && renderTemplate`<div class="w-px flex-1 bg-dark-600 my-1"></div>`} </div> <div class="pb-6"> <span class="font-mono text-brand-400 text-sm font-medium">${item.time}</span> <h4 class="text-white font-semibold mt-0.5">${item.activity}</h4> ${item.description && renderTemplate`<p class="text-gray-500 text-sm mt-0.5">${item.description}</p>`} </div> </div>`)} </div> </section>`} </div> <div class="lg:sticky lg:top-24 h-fit"> <div class="bg-dark-800 border border-dark-600/50 rounded-2xl p-6"> <h3 class="font-display font-bold text-lg text-white mb-5">Pilih Tiket</h3> <div class="space-y-3 mb-6"> ${e.ticket_types?.map((t) => renderTemplate`<div${addAttribute([
    "border rounded-xl p-4",
    t.quota - t.sold <= 0 ? "border-dark-600/30 opacity-50" : "border-dark-600/50 hover:border-brand-600/50 cursor-pointer transition-colors"
  ], "class:list")}> <div class="flex justify-between items-start"> <div> <p class="font-semibold text-white text-sm">${t.name}</p> <p class="text-gray-500 text-xs mt-0.5">${t.quota - t.sold <= 0 ? "Sold Out" : "Sisa " + (t.quota - t.sold) + " tiket"}</p> </div> <span class="font-mono text-brand-400 font-semibold text-sm"> ${t.price === 0 ? "Gratis" : "Rp " + t.price.toLocaleString("id-ID")} </span> </div> </div>`)} </div> ${e.ticket_types?.some((t) => t.quota - t.sold > 0) ? renderTemplate`<a${addAttribute(`/events/${e.slug}/register`, "href")} class="block w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-center py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]">
Beli Tiket Sekarang
</a>` : renderTemplate`<button disabled class="block w-full bg-dark-700 text-gray-600 font-semibold text-center py-3.5 rounded-xl cursor-not-allowed">
Tiket Habis
</button>`} <p class="text-gray-600 text-xs text-center mt-3">Pembayaran via QRIS · Konfirmasi otomatis</p> </div> </div> </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/events/[slug].astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/events/[slug].astro";
const $$url = "/events/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
