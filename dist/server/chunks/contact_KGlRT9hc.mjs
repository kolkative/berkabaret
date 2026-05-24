/* empty css               */
import { c as createComponent } from './astro-component_BR1ZQvN3.mjs';
import 'piccolore';
import { r as renderComponent, s as renderTemplate, n as maybeRenderHead } from './server_Ca08wFV-.mjs';
import { r as renderScript } from './script_CMIWVZ91.mjs';
import { $ as $$Base } from './Base_1oWikkFE.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Kontak — BERKABARET", "description": "Hubungi BERKABARET melalui email atau isi form kontak minimalis." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-5xl px-4 py-16 sm:py-20"> <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"> <div> <p class="mb-3 text-sm uppercase tracking-[0.2em] text-brand-300">Kontak</p> <h1 class="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
Hubungi <span class="text-brand-300">BERKABARET</span> </h1> <p class="mt-4 max-w-xl text-base leading-7 text-gray-300">
Punya pertanyaan tentang event, paket, atau kolaborasi? Anda bisa langsung mengirim email ke
<a href="mailto:halo@berkabaret.com" class="font-medium text-brand-200 underline decoration-brand-400/50 underline-offset-4">
halo@berkabaret.com
</a>
atau isi form di samping.
</p> <div class="mt-8 rounded-2xl border border-dark-600/60 bg-dark-800/60 p-5"> <p class="text-sm uppercase tracking-[0.2em] text-gray-400">Email</p> <a href="mailto:halo@berkabaret.com" class="mt-2 block font-display text-xl font-semibold text-white">
halo@berkabaret.com
</a> <p class="mt-4 text-sm leading-6 text-gray-400">
Kami biasanya membalas dalam 1–2 hari kerja. Untuk kebutuhan event cepat, gunakan email agar kami bisa merespons langsung.
</p> </div> </div> <div class="rounded-[28px] border border-dark-600/60 bg-dark-950/85 p-6 sm:p-8"> <form id="contact-form" class="space-y-5"> <div> <label for="name" class="mb-2 block text-sm font-medium text-gray-200">Nama</label> <input id="name" name="name" type="text" placeholder="Nama kamu" class="w-full rounded-2xl border border-dark-600/70 bg-dark-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"> </div> <div> <label for="email" class="mb-2 block text-sm font-medium text-gray-200">Email</label> <input id="email" name="email" type="email" required placeholder="nama@email.com" class="w-full rounded-2xl border border-dark-600/70 bg-dark-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"> </div> <div> <label for="subject" class="mb-2 block text-sm font-medium text-gray-200">Subjek</label> <input id="subject" name="subject" type="text" placeholder="Pertanyaan event / kolaborasi" class="w-full rounded-2xl border border-dark-600/70 bg-dark-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"> </div> <div> <label for="message" class="mb-2 block text-sm font-medium text-gray-200">Pesan</label> <textarea id="message" name="message" required rows="5" placeholder="Tulis pesan singkat tentang kebutuhan kamu" class="w-full rounded-2xl border border-dark-600/70 bg-dark-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"></textarea> </div> <div id="form-status" class="hidden rounded-2xl px-4 py-3 text-sm"></div> <button type="submit" id="submit-button" class="inline-flex w-full items-center justify-center rounded-full border border-brand-200/60 bg-brand-600/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(59,130,246,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500/95">
Kirim Pesan
</button> </form> </div> </div> </section> ${renderScript($$result2, "/Users/joans/Downloads/berkabaret/src/pages/contact.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/joans/Downloads/berkabaret/src/pages/contact.astro", void 0);

const $$file = "/Users/joans/Downloads/berkabaret/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
