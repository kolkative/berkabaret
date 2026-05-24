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
  events?.filter((e) => new Date(e.date_start) <= now) ?? [];
  const featuredEvents = upcomingEvents.slice(0, 5);
  const heroSlides = featuredEvents.map((event, index) => {
    const date = new Date(event.date_start);
    const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    const timeStr = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const minPrice = event.ticket_types?.length ? Math.min(...event.ticket_types.map((t) => t.price)) : 0;
    const location = event.location || event.venue || "Lokasi akan diumumkan";
    return {
      id: event.id,
      index,
      title: event.title,
      description: event.description,
      coverImage: event.cover_image,
      dateStr,
      timeStr,
      location,
      minPrice,
      slug: event.slug
    };
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "BERKABARET \u2014 Platform Ticketing Event" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative overflow-hidden"> <div class="absolute inset-0 pointer-events-none"> <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-600/20 rounded-full blur-[120px]"></div> </div> <div class="relative max-w-6xl mx-auto px-4 py-24 text-center"> <div class="inline-flex items-center gap-2 bg-brand-900/40 border border-brand-700/40 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-8"> <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
Platform Ticketing & Event Management
</div> <h1 class="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-[1.05] mb-6">
Tiket Event<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">
Gampang & Aman
</span> </h1> <p class="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
Beli tiket event favoritmu dengan mudah. Pembayaran QRIS, konfirmasi otomatis, e-ticket langsung ke email.
</p> <a href="#event-hero-slider" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105">
Lihat Event →
</a> </div> </section>  <section id="event-hero-slider" class="relative overflow-hidden py-4 sm:py-6"> <div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div> <div class="relative max-w-none"> ${heroSlides.length > 0 ? renderTemplate`<div class="mx-auto w-full max-w-[1600px] px-2 sm:px-4"> <div class="rounded-[28px] border border-dark-600/60 bg-dark-950/90 p-2 shadow-[0_20px_80px_rgba(15,23,42,0.5)]"> <div class="relative overflow-hidden rounded-[22px]"> ${heroSlides.map((slide) => renderTemplate`<article data-hero-slide${addAttribute(slide.index, "data-slide-index")}${addAttribute(`relative ${slide.index === 0 ? "" : "hidden"}`, "class")}${addAttribute(slide.index === 0 ? "false" : "true", "aria-hidden")}> <div class="aspect-[16/7] sm:aspect-[21/7] lg:aspect-[24/7] relative overflow-hidden"> ${slide.coverImage ? renderTemplate`<img${addAttribute(slide.coverImage, "src")}${addAttribute(slide.title, "alt")} class="absolute inset-0 h-full w-full object-cover">` : renderTemplate`<div class="absolute inset-0 bg-gradient-to-br from-brand-900 via-dark-800 to-dark-950"></div>`} <div class="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent"></div> <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.35),_transparent_35%)]"></div> <div class="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 lg:p-10 max-w-2xl"> <div class="mb-3 flex flex-wrap gap-2"> <span class="rounded-full bg-brand-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">Event Pilihan</span> <span class="rounded-full bg-dark-950/70 px-3 py-1 text-[11px] font-semibold text-gray-200">${slide.dateStr}</span> </div> <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-[2.6rem] leading-tight text-white mb-3"> ${slide.title} </h2> <p class="text-sm sm:text-base text-gray-200 mb-4 line-clamp-2 max-w-xl"> ${slide.description} </p> <div class="flex flex-wrap items-center gap-3 text-sm text-gray-100 mb-5"> <span class="inline-flex items-center gap-2 rounded-full bg-dark-950/70 px-3 py-1"> <span>📅</span> ${slide.dateStr} · ${slide.timeStr} WIB
</span> <span class="inline-flex items-center gap-2 rounded-full bg-dark-950/70 px-3 py-1"> <span>📍</span> ${slide.location} </span> </div> <div class="flex flex-wrap items-center gap-3"> <span class="font-display font-bold text-lg text-brand-300"> ${slide.minPrice === 0 ? "Gratis" : `Mulai Rp ${slide.minPrice.toLocaleString("id-ID")}`} </span> <a${addAttribute(`/events/${slide.slug}`, "href")} class="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200/60 bg-brand-600/90 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(59,130,246,0.35)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500/95 hover:border-brand-100/80 hover:shadow-[0_16px_40px_rgba(59,130,246,0.45)]">
Beli Tiket
</a> </div> </div> </div> </article>`)} </div> <div class="flex items-center justify-between px-2 pt-4 pb-2"> <div id="hero-dots" class="flex items-center gap-2"> ${heroSlides.map((slide) => renderTemplate`<button type="button" data-hero-dot${addAttribute(slide.index, "data-dot-index")}${addAttribute(`h-2 rounded-full transition-all ${slide.index === 0 ? "w-8 bg-brand-400" : "w-2 bg-white/40"}`, "class")}${addAttribute(`Tampilkan event ${slide.index + 1}`, "aria-label")}></button>`)} </div> <div class="flex items-center gap-2"> <button id="hero-prev" type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark-500/70 bg-dark-900/80 text-white hover:border-brand-500/70 transition-colors" aria-label="Slide sebelumnya">
←
</button> <button id="hero-next" type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark-500/70 bg-dark-900/80 text-white hover:border-brand-500/70 transition-colors" aria-label="Slide berikutnya">
→
</button> </div> </div> </div> </div>` : renderTemplate`<div class="mx-auto w-full max-w-[1600px] px-4"> <div class="rounded-[28px] border border-dashed border-dark-500/70 bg-dark-950/70 p-8 text-center"> <p class="text-4xl mb-3">🎟️</p> <h2 class="font-display font-bold text-2xl mb-2">Event baru segera hadir</h2> <p class="text-gray-300 mb-5">Belum ada event mendatang saat ini. Kunjungi halaman event untuk melihat semua daftar event yang tersedia.</p> <a href="/events" class="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-3 rounded-xl">
Lihat Event
</a> </div> </div>`} </div> </section>  ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/index.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
