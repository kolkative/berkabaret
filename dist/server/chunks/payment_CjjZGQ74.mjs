import { c as createComponent } from './astro-component_BxIlvnV1.mjs';
import 'piccolore';
import { q as renderTemplate, l as defineScriptVars, r as renderComponent, n as maybeRenderHead, j as addAttribute } from './server_COGFvjq1.mjs';
import { $ as $$Base } from './Base_Uz_3_hmj.mjs';
import { s as supabaseAdmin } from './supabase_BE5k4aVa.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Payment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Payment;
  const { order_code } = Astro2.params;
  const { data: order } = await supabaseAdmin.from("orders").select("*, events(title, venue, date_start)").eq("order_code", order_code).single();
  if (!order) return Astro2.redirect("/events");
  if (order.status === "PAID") return Astro2.redirect(`/orders/${order_code}/success`);
  if (order.status === "EXPIRED") return Astro2.redirect(`/orders/${order_code}/expired`);
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  // Countdown timer\n  const expiry = new Date(expiredAt).getTime();\n  const countdownEl = document.getElementById('countdown');\n\n  const timer = setInterval(() => {\n    const remaining = Math.max(0, expiry - Date.now());\n    const mins = Math.floor(remaining / 60000);\n    const secs = Math.floor((remaining % 60000) / 1000);\n    countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;\n    if (remaining === 0) {\n      clearInterval(timer);\n      window.location.href = `/orders/${orderCode}/expired`;\n    }\n  }, 1000);\n\n  // Poll status setiap 5 detik\n  const poll = setInterval(async () => {\n    try {\n      const res = await fetch(`/api/orders/status?code=${orderCode}`);\n      const data = await res.json();\n      if (data.status === 'PAID') {\n        clearInterval(poll);\n        clearInterval(timer);\n        window.location.href = `/orders/${orderCode}/success`;\n      } else if (data.status === 'EXPIRED') {\n        clearInterval(poll);\n        clearInterval(timer);\n        window.location.href = `/orders/${orderCode}/expired`;\n      }\n    } catch {}\n  }, 5000);\n})();<\/script>"], ["", " <script>(function(){", "\n  // Countdown timer\n  const expiry = new Date(expiredAt).getTime();\n  const countdownEl = document.getElementById('countdown');\n\n  const timer = setInterval(() => {\n    const remaining = Math.max(0, expiry - Date.now());\n    const mins = Math.floor(remaining / 60000);\n    const secs = Math.floor((remaining % 60000) / 1000);\n    countdownEl.textContent = \\`\\${String(mins).padStart(2, '0')}:\\${String(secs).padStart(2, '0')}\\`;\n    if (remaining === 0) {\n      clearInterval(timer);\n      window.location.href = \\`/orders/\\${orderCode}/expired\\`;\n    }\n  }, 1000);\n\n  // Poll status setiap 5 detik\n  const poll = setInterval(async () => {\n    try {\n      const res = await fetch(\\`/api/orders/status?code=\\${orderCode}\\`);\n      const data = await res.json();\n      if (data.status === 'PAID') {\n        clearInterval(poll);\n        clearInterval(timer);\n        window.location.href = \\`/orders/\\${orderCode}/success\\`;\n      } else if (data.status === 'EXPIRED') {\n        clearInterval(poll);\n        clearInterval(timer);\n        window.location.href = \\`/orders/\\${orderCode}/expired\\`;\n      }\n    } catch {}\n  }, 5000);\n})();<\/script>"])), renderComponent($$result, "Base", $$Base, { "title": "Selesaikan Pembayaran — BERKABARET" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-lg mx-auto px-4 py-16 text-center"> <!-- Timer --> <div class="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-700/40 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
⏱ Selesaikan dalam: <span id="countdown" class="font-mono font-bold">15:00</span> </div> <h1 class="font-display font-extrabold text-3xl mb-2">Scan & Bayar</h1> <p class="text-gray-500 mb-8">Scan QR di bawah dengan aplikasi bank atau e-wallet apapun</p> <!-- Payment box --> <div class="bg-dark-800 border border-dark-600/50 rounded-2xl p-8 mb-6"> <!-- Order info --> <div class="text-left mb-6 pb-6 border-b border-dark-600/50 space-y-2"> <div class="flex justify-between text-sm"> <span class="text-gray-500">Event</span> <span class="text-white font-medium">${order.events?.title}</span> </div> <div class="flex justify-between text-sm"> <span class="text-gray-500">Tiket</span> <span class="text-white">${order.ticket_type_name} × ${order.quantity}</span> </div> <div class="flex justify-between text-sm"> <span class="text-gray-500">Kode Order</span> <span class="text-white font-mono text-xs">${order.order_code}</span> </div> <div class="flex justify-between text-sm font-bold"> <span class="text-gray-300">Total</span> <span class="text-brand-400 font-mono">Rp ${order.total_amount.toLocaleString("id-ID")}</span> </div> </div> <!-- QRIS via iframe dari Mayar --> ${order.mayar_payment_url ? renderTemplate`<div class="bg-white rounded-xl p-4 flex items-center justify-center min-h-[260px]"> <iframe${addAttribute(order.mayar_payment_url, "src")} class="w-full h-64 border-none" title="QRIS Payment"></iframe> </div>` : renderTemplate`<div class="bg-white rounded-xl p-6 text-center text-gray-800"> <p class="text-sm">Halaman pembayaran tidak tersedia.</p> <a${addAttribute(order.mayar_payment_url, "href")} target="_blank" class="text-brand-600 underline text-sm">
Buka di tab baru →
</a> </div>`} <!-- Tombol buka di tab baru --> <a${addAttribute(order.mayar_payment_url, "href")} target="_blank" class="mt-4 block w-full bg-dark-700 hover:bg-dark-600 text-white text-sm font-medium py-3 rounded-xl transition-colors">
🔗 Buka halaman pembayaran
</a> </div> <!-- Status polling --> <div id="statusCheck" class="text-gray-500 text-sm flex items-center justify-center gap-2"> <span class="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
Menunggu konfirmasi pembayaran...
</div> </div> ` }), defineScriptVars({ orderCode: order.order_code, expiredAt: order.expired_at }));
}, "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/payment.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/orders/[order_code]/payment.astro";
const $$url = "/orders/[order_code]/payment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Payment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
