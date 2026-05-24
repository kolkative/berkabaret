/* empty css               */
import { c as createComponent } from './astro-component_BR1ZQvN3.mjs';
import 'piccolore';
import { r as renderComponent, s as renderTemplate, n as maybeRenderHead, j as addAttribute } from './server_Ca08wFV-.mjs';
import { $ as $$Base } from './Base_1oWikkFE.mjs';
import { s as supabaseAdmin } from './supabase_BE5k4aVa.mjs';

const $$Orders = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Orders;
  const adminSecret = "bersatungahij1";
  const secretParam = Astro2.url.searchParams.get("secret");
  const hasCookie = Astro2.cookies.get("admin_session")?.value === "true";
  if (secretParam === adminSecret) {
    Astro2.cookies.set("admin_session", "true", {
      path: "/admin",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
    });
  }
  if (!hasCookie && secretParam !== adminSecret) {
    return Astro2.redirect("/admin/login");
  }
  const page = parseInt(Astro2.url.searchParams.get("page") ?? "1");
  const statusFilter = Astro2.url.searchParams.get("status") ?? "all";
  const limit = 50;
  const offset = (page - 1) * limit;
  let query = supabaseAdmin.from("orders").select("*, events(title)", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }
  const { data: orders, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / limit);
  const statusColors = {
    PAID: "bg-green-500/20 text-green-400 border-green-500/30",
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    EXPIRED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Admin Dashboard — BERKABARET" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 py-12"> <div class="flex items-center justify-between mb-8"> <div> <h1 class="font-display font-extrabold text-3xl mb-1">Dashboard Admin</h1> <p class="text-gray-500 text-sm">Total: ${count} orders</p> </div> <a href="/api/admin/logout" class="rounded-xl border border-dark-600/60 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-brand-500 hover:text-white">
Logout
</a> </div> <!-- Filter --> <div class="flex gap-2 mb-6 flex-wrap"> ${["all", "PENDING", "PAID", "EXPIRED", "CANCELLED"].map((s) => renderTemplate`<a${addAttribute(`/admin/orders?status=${s}`, "href")}${addAttribute(`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${statusFilter === s ? "bg-brand-600 border-brand-500 text-white" : "bg-dark-800 border-dark-600/50 text-gray-400 hover:text-white"}`, "class")}> ${s === "all" ? "Semua" : s} </a>`)} </div> <!-- Table --> <div class="bg-dark-800 border border-dark-600/50 rounded-2xl overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="border-b border-dark-600/50 text-gray-500 text-xs uppercase tracking-wider"> <th class="text-left px-5 py-4">Kode Order</th> <th class="text-left px-5 py-4">Pembeli</th> <th class="text-left px-5 py-4">Event</th> <th class="text-left px-5 py-4">Tiket</th> <th class="text-left px-5 py-4">Total</th> <th class="text-left px-5 py-4">Status</th> <th class="text-left px-5 py-4">Tanggal</th> </tr> </thead> <tbody class="divide-y divide-dark-600/30"> ${orders?.map((order) => renderTemplate`<tr class="hover:bg-dark-700/30 transition-colors"> <td class="px-5 py-4 font-mono text-xs text-brand-400">${order.order_code}</td> <td class="px-5 py-4"> <p class="text-white font-medium">${order.buyer_name}</p> <p class="text-gray-500 text-xs">${order.buyer_email}</p> <p class="text-gray-600 text-xs">${order.buyer_phone}</p> </td> <td class="px-5 py-4 text-gray-300 max-w-[180px]"> <span class="line-clamp-2">${order.events?.title}</span> </td> <td class="px-5 py-4 text-gray-300"> <p>${order.ticket_type_name}</p> <p class="text-gray-500 text-xs">× ${order.quantity}</p> </td> <td class="px-5 py-4 font-mono text-white font-semibold">
Rp ${order.total_amount.toLocaleString("id-ID")} </td> <td class="px-5 py-4"> <span${addAttribute(`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status] ?? ""}`, "class")}> ${order.status} </span> ${order.qr_code && renderTemplate`<p class="font-mono text-xs text-gray-600 mt-1">${order.qr_code}</p>`} </td> <td class="px-5 py-4 text-gray-500 text-xs"> ${new Date(order.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })} </td> </tr>`)} ${(!orders || orders.length === 0) && renderTemplate`<tr> <td colspan="7" class="text-center py-16 text-gray-600">Tidak ada order</td> </tr>`} </tbody> </table> </div> </div> <!-- Pagination --> ${totalPages > 1 && renderTemplate`<div class="flex justify-center gap-2 mt-6"> ${Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => renderTemplate`<a${addAttribute(`/admin/orders?status=${statusFilter}&page=${p}`, "href")}${addAttribute(`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${page === p ? "bg-brand-600 text-white" : "bg-dark-800 border border-dark-600/50 text-gray-400 hover:text-white"}`, "class")}> ${p} </a>`)} </div>`} </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/admin/orders.astro", void 0);
const $$file = "/Users/joans/Downloads/berkabaret/src/pages/admin/orders.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Orders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
