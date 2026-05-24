import { s as supabaseAdmin } from '../../chunks/supabase_BE5k4aVa.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!email || !message) {
      return new Response(JSON.stringify({ success: false, message: "Email dan pesan wajib diisi." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name,
      email,
      subject,
      message
    });
    if (error) {
      console.error("Supabase contact insert error:", error);
      return new Response(JSON.stringify({ success: false, message: "Gagal menyimpan pesan. Coba lagi nanti." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, message: "Pesan berhasil terkirim." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(JSON.stringify({ success: false, message: "Terjadi kesalahan. Silakan coba lagi." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
