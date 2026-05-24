import { s as supabaseAdmin } from './supabase_BE5k4aVa.mjs';

const GET = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) return new Response(JSON.stringify({ error: "Missing code" }), { status: 400 });
  const { data: order } = await supabaseAdmin.from("orders").select("status").eq("order_code", code).single();
  if (!order) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  return new Response(JSON.stringify({ status: order.status }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
