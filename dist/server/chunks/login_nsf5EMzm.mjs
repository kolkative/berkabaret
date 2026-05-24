const POST = async ({ request, cookies }) => {
  const formData = await request.formData();
  const secret = String(formData.get("secret") ?? "").trim();
  if (secret !== "bersatungahij1") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login?error=1" }
    });
  }
  cookies.set("admin_session", "true", {
    path: "/admin",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24
  });
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/orders" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
