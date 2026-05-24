/* empty css               */
import { c as createComponent } from './astro-component_BR1ZQvN3.mjs';
import 'piccolore';
import { r as renderComponent, s as renderTemplate, n as maybeRenderHead } from './server_Ca08wFV-.mjs';
import { $ as $$Base } from './Base_1oWikkFE.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error") === "1";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Admin Login — BERKABARET" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto px-4 py-16"> <div class="bg-dark-800 border border-dark-600/50 rounded-3xl p-8 shadow-2xl"> <p class="text-xs uppercase tracking-[0.3em] text-brand-300 mb-3">Berkabaret Admin</p> <h1 class="font-display font-extrabold text-3xl mb-2">Masuk Admin</h1> <p class="text-gray-400 text-sm mb-8">Masukkan secret admin untuk membuka dashboard.</p> ${error && renderTemplate`<div class="mb-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
Secret salah. Coba lagi.
</div>`} <form method="POST" action="/api/admin/login" class="space-y-4"> <div> <label for="secret" class="block text-sm font-medium text-gray-300 mb-2">Admin Secret</label> <input id="secret" name="secret" type="password" required autocomplete="current-password" class="w-full rounded-xl border border-dark-600/60 bg-dark-900 px-4 py-3 text-white outline-none transition focus:border-brand-500" placeholder="Masukkan secret"> </div> <button type="submit" class="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-500">
Masuk
</button> </form> </div> </div> ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/admin/login.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
