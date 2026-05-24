import { c as createComponent } from './astro-component_BxIlvnV1.mjs';
import 'piccolore';
import { j as addAttribute, n as maybeRenderHead, p as renderSlot, q as renderTemplate } from './server_COGFvjq1.mjs';
import 'clsx';

const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  return renderTemplate`<html lang="id">import '../styles/global.css'<meta name="description"${addAttribute(description, "content")}>
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}
const { title, description = 'Platform ticketing event terpercaya', ogImage } = Astro.props;
const appUrl = import.meta.env.PUBLIC_APP_URL || 'http://localhost:3000';
<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${title}
  
  ${renderTemplate`ogImage && <meta property="og:image"${addAttribute(`${appUrl}${ogImage}`, "content")}>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">


  <!-- Navbar -->
  ${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 border-b border-dark-600/50 backdrop-blur-md bg-dark-900/80">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="font-display font-bold text-xl tracking-tight">
        <span class="text-brand-400">●</span> BERKABARET
      </a>
      <div class="flex items-center gap-6">
        <a href="/events" class="text-sm text-gray-400 hover:text-white transition-colors">Events</a>
        <a href="/contact" class="text-sm text-gray-400 hover:text-white transition-colors">Kontak</a>
      </div>
    </div>
  </nav>

  <!-- Content (offset for fixed navbar) -->
  <div class="pt-16">
    ${renderSlot($$result, $$slots["default"])}
  </div>

  <!-- Footer -->
  <footer class="border-t border-dark-600/50 mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
      <p class="font-display font-semibold text-gray-400 mb-2">
        <span class="text-brand-400">●</span> BERKABARET
      </p>
      <p>Platform ticketing event &amp; jasa penyelenggara acara</p>
    </div>
  </footer>`}</title></html>`;
}, "/Users/joans/Downloads/berkabaret/src/layouts/Base.astro", void 0);

export { $$Base as $ };
