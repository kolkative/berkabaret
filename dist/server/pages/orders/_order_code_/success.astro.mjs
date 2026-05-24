/* empty css                                       */
import { Q as createComponent, a0 as renderComponent, a7 as renderTemplate, O as createAstro, _ as maybeRenderHead } from '../../../chunks/astro/server_oT8Kx1uN.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../../chunks/Base_B0qVImWu.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_BE5k4aVa.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Success = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  const { order_code } = Astro2.params;
  const { data: order } = await supabaseAdmin.from("orders").select("*, events(title, venue, date_start)").eq("order_code", order_code).eq("status", "PAID").single();
  if (!order) return Astro2.redirect("/events");
  const eventDate = new Date(order.events.date_start).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Pembayaran Berhasil \u2014 BERKABARET" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-lg mx-auto px-4 py-16 text-center"> <!-- Checkmark animation --> <div class="w-20 h-20 bg-green-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
✅
</div> <h1 class="font-display font-extrabold text-3xl mb-2 text-green-400">Pembayaran Berhasil!</h1> <p class="text-gray-400 mb-10">E-ticket sudah dikirim ke <span class="text-white font-medium">${order.buyer_email}</span></p> <div class="bg-dark-800 border border-dark-600/50 rounded-2xl p-6 text-left space-y-3 mb-8"> <h2 class="font-display font-bold text-white text-lg mb-4">Detail Tiket</h2> ${[
    ["Event", order.events?.title],
    ["Tanggal", eventDate],
    ["Lokasi", order.events?.venue],
    ["Nama", order.buyer_name],
    ["Tiket", `${order.ticket_type_name} \xD7 ${order.quantity}`],
    ["Kode Order", order.order_code],
    ["Total", `Rp ${order.total_amount.toLocaleString("id-ID")}`]
  ].map(([label, value]) => renderTemplate`<div class="flex justify-between text-sm"> <span class="text-gray-500">${label}</span> <span class="text-white font-medium text-right max-w-[60%]">${value}</span> </div>`)} <div class="pt-4 border-t border-dark-600/50"> <p class="text-xs text-gray-600 text-center">Kode QR masuk event dikirim via email</p> </div> </div> <!-- QR display --> <div class="bg-white rounded-2xl p-6 mb-8"> <p class="text-dark-900 text-xs mb-2 font-medium">QR Code Masuk Event</p> <div class="font-mono font-black text-4xl text-dark-900 tracking-[6px]">${order.qr_code}</div> <p class="text-gray-500 text-xs mt-2">Tunjukkan kepada panitia saat masuk</p> </div> <a href="/events" class="inline-flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600/50 text-white font-medium px-6 py-3 rounded-xl transition-colors">
← Lihat Event Lainnya
</a> </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/success.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/success.astro";
const $$url = "/orders/[order_code]/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
